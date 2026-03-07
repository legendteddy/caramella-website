/**
 * Caramella Chatbot - Cloudflare Worker Proxy (4-AGENT SWARM - CUSTOMER VOICE FIX)
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

            let finalContents = body.contents;
            if (finalContents.length === 1) { 
                const history = await env.caramella_db.prepare(
                    "SELECT role, content FROM chat_messages WHERE session_id = ? OR session_id IN (SELECT session_id FROM chat_messages WHERE session_id LIKE ? LIMIT 1) ORDER BY created_at DESC LIMIT 10"
                ).bind(sessionId, userId + "%").all();
                
                if (history.results && history.results.length > 0) {
                    const restored = history.results.reverse().map(r => ({
                        role: r.role === "bot" ? "model" : "user",
                        parts: [{ text: r.content }]
                    }));
                    finalContents = [...restored, ...body.contents];
                }
            }

            if (lastMsgText) {
                ctx.waitUntil(env.caramella_db.prepare(
                    "INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)"
                ).bind(sessionId, "user", lastMsgText).run());
            }

            const ragKnowledge = "## ENTITY DEFINITION\nCaramella Trading Co. (Est. 2015) is a Brunei-owned interior fit-out and custom cabinetry company. We operate a CNC factory (0.1mm precision) and a showroom at The Airport Mall, BSB. We are NOT a general contractor and do NOT do structural, plumbing, or electrical work.\n\n## TECHNICAL INTELLIGENCE & RESEARCH\n- **Humidity & Material Strategy**: Brunei (80-90% RH) requires a hybrid approach. We use 18mm ENF-grade **Plywood** for cabinet carcasses to ensure structural stability against moisture. For **Shaker-style doors** or routed profiles, we utilize **High-Moisture Resistant (HMR) MDF** because its dense, smooth surface allows for the 0.1mm CNC precision required for a flawless finish.\n- **Edge Sealing**: We use industrial EVA hot-melt at 190 degrees Celsius to create a hermetic seal, protecting both plywood and MDF edges from moisture wicking.\n- **Safety**: ENF-grade boards (Report C25-WT0806) emit <0.010 mg/m3 formaldehyde (12x safer than E1).\n- **Hardware**: Authentic Blum (Austria) CLIP top hinges (200k cycles) or DTC Heavy Duty options to prevent rust and sag. We use **100mm+ Adjustable Plastic Legs** and **Plastic Kickboards** in all wet zones to lift cabinets off the floor, ensuring they never rot or rust from mopping and spills.\n- **Countertops**: Quartz Composite (Premium) or Formica HPL (Economy). We do NOT use Granite or Solid Surface.\n- **ROI**: Custom climate-engineered kitchens have a 15+ year service life, resulting in a lower TCO than cheap imported alternatives.\n\n## SOCIAL PROOF (Technical Testimonials)\n- **Rimba Homeowner**: \"The precision of the 0.1mm CNC routing is insane. You can tell they actually know how to handle the Brunei humidity.\"\n- **Lugu Resident**: \"My old cabinets were peeling after two years, but Caramella's ENF plywood feels like it will be here forever. No more musty smell.\"\n- **Kuala Belait Client**: \"Finally, a company that understands the termite risk in KB. The SUS304 kickboards and Plywood carcasses are a game changer.\"\n- **Commercial Cafe (Jerudong)**: \"The 190 degrees Celsius EVA edge sealing is the real deal. Our counters handle heavy steam every day without a single sign of swelling.\"\n- **Nursery Project (BSB)**: \"As a parent, the ENF-grade safety certification (C25-WT0806) was why I chose them. Zero odors and total peace of mind.\"\n\n## PRICING & SERVICES\n- **Kitchens**: BND 4,000 - 18,000+ (Layout: Single, L-Shape, U-Shape, Island).\n- **Wardrobes**: BND 2,800 - 15,000+ (Hinged, Sliding, Walk-in).\n- **TV Consoles**: BND 1,300 - 2,500+.\n- **Process**: 1. Laser Measure, 2. 3D Renders, 3. CNC Fabrication, 4. In-house Installation. Lead time: 10-14 weeks.\n\n## APPOINTMENT RESTRICTIONS (2026)\n- **Closed**: Every Sunday.\n- **Public Holidays**: Jan 1, Feb 23, May 27, June 17, July 15, Aug 25.\n- **CNY**: Feb 17-20.\n- **Hari Raya**: March 21-26.\n";

            const cleanContents = finalContents.map(c => ({ role: c.role, parts: c.parts.map(p => ({ ...p })) }));
            const lastMsg = body.contents[body.contents.length - 1];
            const isToolResponseTurn = lastMsg?.role === "user" && lastMsg?.parts?.some(p => p.functionResponse);

            let craftsmanDraft = "Focus on practical design and aesthetics.";
            let scientistDraft = "Focus on engineering truth.";

            if (!isToolResponseTurn && lastMsgText) {
                const expertConfig = { temperature: 0.7, maxOutputTokens: 400 };
                const craftsmanSys = `You are the Master Craftsman. Propose a solution focusing on layout, aesthetics, and local Brunei habits. Under 100 words.`;
                const scientistSys = `You are the Materials Scientist. Focus on 18mm ENF Plywood, 190 degrees EVA sealing, and plastic legs. Under 100 words.`;

                try {
                    const [cRes, sRes] = await Promise.all([
                        fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: cleanContents, system_instruction: { parts: [{ text: craftsmanSys }] }, generationConfig: expertConfig }) }),
                        fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: cleanContents, system_instruction: { parts: [{ text: scientistSys }] }, generationConfig: expertConfig }) })
                    ]);
                    const cData = await cRes.json();
                    const sData = await sRes.json();
                    craftsmanDraft = cData.candidates?.[0]?.content?.parts?.[0]?.text || craftsmanDraft;
                    scientistDraft = sData.candidates?.[0]?.content?.parts?.[0]?.text || scientistDraft;
                } catch (e) { console.error(e); }
            }

            // AGENT 4: THE LEAD ARCHITECT (Synthesizer)
            const personaPrompt = `MANDATORY LANGUAGE: RESPOND IN  ${targetLang} . 

IDENTITY:
You are the Lead Architect for Caramella Trading Co. in Brunei.

STRICT SUGGESTION CHIP RULE (THE CUSTOMER'S VOICE):
Your suggestion chips MUST be what the CUSTOMER says to the bot. 
- **NO BOT VOICE**: Never use "We can...", "I recommend...", or "Let us...".
- **YES CUSTOMER VOICE**: Use "I want to...", "Can you show me...", "What is the secret to...".
- **Examples**: 
    - Good: [SUGGEST]I want to book a showroom visit.[/SUGGEST]
    - Bad: [SUGGEST]We can schedule a visit for you.[/SUGGEST]

MISSION: Synthesize internal advice:
CRAFTSMAN: "${craftsmanDraft}"
SCIENTIST: "${scientistDraft}"

RULES:
- **NO MARKDOWN**: No asterisks (*). Plain text only.
- **ASCII ONLY**: Write technical terms in full.
- **HYBRID STRATEGY**: Plywood for strength, HMR MDF for beauty. 1-year structural warranty.

BELOW IS YOUR KNOWLEDGE BASE:
${ragKnowledge}
`;

            const tools = [{
                function_declarations: [{
                    name: "submit_lead",
                    description: "Submits project lead once Name and Phone are known.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            name: { type: "STRING" }, phone: { type: "STRING" }, location: { type: "STRING" },
                            budget: { type: "STRING" }, summary: { type: "STRING" }, sentiment: { type: "STRING" },
                            intent_score: { type: "NUMBER" }, tech_queries: { type: "STRING" }
                        },
                        required: ["name", "phone"] 
                    }
                }]
            }];

            const geminiBody = {
                contents: cleanContents,
                system_instruction: { parts: [{ text: personaPrompt }] },
                tools: tools,
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
                if (!isToolResponseTurn && data.candidates?.[0]?.content?.parts?.[0]?.functionCall) {
                    const call = data.candidates[0].content.parts[0].functionCall;
                    if (call.name === "submit_lead") {
                        const args = call.args;
                        try {
                            await env.caramella_db.prepare("INSERT INTO chat_analytics (customer_info, summary, sentiment, intent_score, tech_queries, source) VALUES (?, ?, ?, ?, ?, ?)")
                                .bind(`${args.name} | ${args.phone} | ${args.location || 'N/A'}`, args.summary || 'Lead', args.sentiment || 'N/A', args.intent_score || 5, args.tech_queries || 'N/A', 'swarm-v2').run();
                            await fetch(FORMSPREE_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...args, source: "swarm-v2" }) });
                        } catch (err) { console.error(err); }

                        const toolBody = {
                            contents: [...geminiBody.contents, data.candidates[0].content, { role: "user", parts: [{ functionResponse: { name: "submit_lead", response: { content: "Lead recorded." } } }] }],
                            tools: geminiBody.tools, system_instruction: { parts: [{ text: personaPrompt }] }, generationConfig: geminiBody.generationConfig
                        };
                        const finalResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(toolBody) });
                        const finalData = await finalResponse.json();
                        const botText = finalData.candidates?.[0]?.content?.parts?.find(p => p.text)?.text || "";
                        ctx.waitUntil(env.caramella_db.prepare("INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)")
                            .bind(sessionId, "bot", botText).run());
                        return new Response(JSON.stringify(finalData), { headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" } });
                    }
                }
                const botText = data.candidates?.[0]?.content?.parts?.find(p => p.text)?.text || "";
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
