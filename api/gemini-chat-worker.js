/**
 * Caramella Chatbot - Cloudflare Worker Proxy (SWARM V9 - COUNTERTOP ALIGNMENT)
 */
const GEMINI_MODEL = "gemini-3.1-flash-lite-preview";
const FORMSPREE_URL = "https://formspree.io/f/mreazjqo";

export default {
    async fetch(request, env, ctx) {
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Content-Type": "application/json; charset=utf-8"
                },
            });
        }
        if (request.method !== "POST") {
            return new Response("Method not allowed", { status: 405 });
        }
        try {
            const apiKey = env.GEMINI_API_KEY;
            const body = await request.json();
            const sessionId = body.session_id || "sid-" + Date.now();
            const userId = body.user_id || sessionId;

            // 1. GATEKEEPER
            const lastMsgText = body.contents[body.contents.length - 1]?.parts?.find(p => p.text)?.text || "";
            let targetLang = "the same language as the user";
            if (/[ぁ-んァ-ン]/.test(lastMsgText)) targetLang = "JAPANESE (NIHONGO)";
            else if (/[\u4e00-\u9fa5]/.test(lastMsgText)) targetLang = "CHINESE (MANDARIN)";
            else if (/bah|biskita|ngam|inda|kita|dapur/i.test(lastMsgText)) targetLang = "BRUNEIAN MALAY / ENGLISH MIX";

            // GREETING BYPASS
            const isGreeting = lastMsgText.length < 12 && /hi|hello|salam|hey|pagi|siang|malam/i.test(lastMsgText);
            if (isGreeting) {
                const staticRes = {
                    candidates: [{
                        content: {
                            parts: [{ text: "Hello! I am your Design Consultant at Caramella. How can I assist you with your interior project today?\n\n[SUGGEST]I want to discuss a new kitchen project.[/SUGGEST]\n[SUGGEST]Can I see your showroom samples?[/SUGGEST]\n[SUGGEST]What is the typical lead time?[/SUGGEST]" }]
                        }
                    }]
                };
                return new Response(JSON.stringify(staticRes), { headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" } });
            }

            let finalContents = body.contents;
            if (finalContents.length === 1) { 
                const history = await env.caramella_db.prepare(
                    "SELECT role, content FROM chat_messages WHERE session_id = ? ORDER BY created_at DESC LIMIT 10"
                ).bind(sessionId).all();
                if (history.results && history.results.length > 0) {
                    finalContents = [...history.results.reverse().map(r => ({ role: r.role === "bot" ? "model" : "user", parts: [{ text: r.content }] })), ...body.contents];
                }
            }

            if (lastMsgText) {
                ctx.waitUntil(env.caramella_db.prepare("INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)")
                    .bind(sessionId, "user", lastMsgText).run());
            }

            const ragKnowledge = "## ENTITY DEFINITION\nCaramella Trading Co. (Est. 2015) is a Brunei-owned interior fit-out and custom cabinetry company. We operate a CNC factory (0.1mm precision) and a showroom at The Airport Mall, BSB. We are NOT a general contractor and do NOT do structural, plumbing, or electrical work.\n\n## TECHNICAL INTELLIGENCE & RESEARCH\n- **Humidity & Material Strategy**: Brunei (80-90% RH) requires a hybrid approach. We use 18mm ENF-grade **Plywood** for cabinet carcasses to ensure structural stability against moisture. For **Shaker-style doors** or routed profiles, we utilize **High-Moisture Resistant (HMR) MDF** because its dense, smooth surface allows for the 0.1mm CNC precision required for a flawless finish.\n- **Edge Sealing**: We use industrial EVA hot-melt at 190 degrees Celsius to create a hermetic seal, protecting both plywood and MDF edges from moisture wicking.\n- **Safety**: ENF-grade boards (Report C25-WT0806) emit <0.010 mg/m3 formaldehyde (12x safer than E1).\n- **Hardware**: Authentic Blum (Austria) CLIP top hinges (200k cycles) or DTC Heavy Duty options to prevent rust and sag. We use **100mm+ Adjustable Plastic Legs** and **Plastic Kickboards** in all wet zones to lift cabinets off the floor, ensuring they never rot or rust from mopping and spills.\n- **Countertops**: Engineered Quartz Stone (Primary Standard - Non-porous, Zero-maintenance). Sintered Stone (Specialized High-Heat option). We do NOT use Granite, Solid Surface, or Marble.\n- **ROI**: Custom climate-engineered kitchens have a 15+ year service life, resulting in a lower TCO than cheap imported alternatives.\n\n## SOCIAL PROOF (Technical Testimonials)\n- **Rimba Homeowner**: \"The precision of the 0.1mm CNC routing is insane. You can tell they actually know how to handle the Brunei humidity.\"\n- **Lugu Resident**: \"My old cabinets were peeling after two years, but Caramella's ENF plywood feels like it will be here forever. No more musty smell.\"\n- **Kuala Belait Client**: \"Finally, a company that understands the termite risk in KB. The SUS304 kickboards and Plywood carcasses are a game changer.\"\n- **Commercial Cafe (Jerudong)**: \"The 190 degrees Celsius EVA edge sealing is the real deal. Our counters handle heavy steam every day without a single sign of swelling.\"\n- **Nursery Project (BSB)**: \"As a parent, the ENF-grade safety certification (C25-WT0806) was why I chose them. Zero odors and total peace of mind.\"\n\n## PRICING & SERVICES\n- **Kitchens**: BND 4,000 - 18,000+ (Layout: Single, L-Shape, U-Shape, Island).\n- **Wardrobes**: BND 2,800 - 15,000+ (Hinged, Sliding, Walk-in).\n- **TV Consoles**: BND 1,300 - 2,500+.\n- **Process**: 1. Laser Measure, 2. 3D Renders, 3. CNC Fabrication, 4. In-house Installation. Lead time: 10-14 weeks.\n\n## APPOINTMENT RESTRICTIONS (2026)\n- **Closed**: Every Sunday.\n- **Public Holidays**: Jan 1, Feb 23, May 27, June 17, July 15, Aug 25.\n- **CNY**: Feb 17-20.\n- **Hari Raya**: March 21-26.\n";

            const cleanContents = finalContents.map(c => ({ role: c.role, parts: c.parts.map(p => ({ ...p })) }));
            const lastMsg = body.contents[body.contents.length - 1];
            const isToolResponseTurn = lastMsg?.role === "user" && lastMsg?.parts?.some(p => p.functionResponse);

            let craftsmanDraft = "Focus on practical design.";
            let scientistDraft = "Focus on Engineered Quartz Stone.";

            if (!isToolResponseTurn && lastMsgText) {
                const expertConfig = { temperature: 0.7, maxOutputTokens: 400 };
                const cSys = `You are the Master Craftsman. Focus on layout and aesthetics. Recommend Engineered Quartz Stone as the primary non-porous standard. Use Sintered Stone only for specialized high-heat needs.`;
                const sSys = `You are the Materials Scientist. Focus on 18mm Plywood and 190 degrees EVA. Confirm Engineered Quartz is the maintenance-free standard for Brunei.`;

                try {
                    const [cRes, sRes] = await Promise.all([
                        fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: cleanContents, system_instruction: { parts: [{ text: cSys }] }, generationConfig: expertConfig }) }),
                        fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: cleanContents, system_instruction: { parts: [{ text: sSys }] }, generationConfig: expertConfig }) })
                    ]);
                    const cData = await cRes.json();
                    const sData = await sRes.json();
                    craftsmanDraft = cData.candidates?.[0]?.content?.parts?.[0]?.text || craftsmanDraft;
                    scientistDraft = sData.candidates?.[0]?.content?.parts?.[0]?.text || scientistDraft;
                } catch (e) { console.error(e); }
            }

            // AGENT 4: THE LEAD CONSULTANT
            const personaPrompt = `MANDATORY: RESPOND IN  ${targetLang} .
IDENTITY: Design Consultant for Caramella.
STRICT COUNTERTOP POLICY: **Engineered Quartz Stone** is our primary standard. It is non-porous and maintenance-free. **Sintered Stone** is a secondary high-heat specialist option. ALWAYS prioritize Quartz unless high-heat resistance is specifically requested.
STRICT: NO MARKDOWN. NO BULLETS. NO ASTERISKS.
MANDATORY EXIT GATE: Exactly 3 customer-voice [SUGGEST] chips.

MISSION: Synthesize internal advice:
CRAFTSMAN: "${craftsmanDraft}"
SCIENTIST: "${scientistDraft}"

KNOWLEDGE BASE:
${ragKnowledge}
`;

            const geminiBody = {
                contents: cleanContents,
                system_instruction: { parts: [{ text: personaPrompt }] },
                tools: [{ function_declarations: [{ name: "submit_lead", description: "Captures lead.", parameters: { type: "OBJECT", properties: { name: { type: "STRING" }, phone: { type: "STRING" } }, required: ["name", "phone"] } }] }],
                generationConfig: { temperature: 0.8, topP: 0.95, maxOutputTokens: 1000 }
            };

            const url = new URL(request.url);
            const useStreaming = url.searchParams.get('stream') !== 'false';
            const endpoint = useStreaming 
                ? `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${apiKey}`
                : `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

            let response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(geminiBody) });
            if (!response.ok) { const errText = await response.text(); throw new Error(`Gemini API error: ${errText}`); }

            if (!useStreaming) {
                const data = await response.json();
                let botText = data.candidates?.[0]?.content?.parts?.find(p => p.text)?.text || "";
                
                if (botText && !botText.includes("[SUGGEST]")) {
                    botText += "\n\n[SUGGEST]I want to see Engineered Quartz samples.[/SUGGEST]\n[SUGGEST]What is the difference between Quartz and Sintered Stone?[/SUGGEST]\n[SUGGEST]Can I book a showroom visit today?[/SUGGEST]";
                    data.candidates[0].content.parts[0].text = botText;
                }

                if (botText) { await env.caramella_db.prepare("INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)")
                    .bind(sessionId, "bot", botText).run(); }
                return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" } });
            }

            return new Response(response.body, {
                status: response.status,
                headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache", "Connection": "keep-alive", "Access-Control-Allow-Origin": "*" },
            });
        } catch (error) { return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" } }); }
    },
};
