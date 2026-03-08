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

            const ragKnowledge = "## ENTITY DEFINITION\nCaramella Trading Co. (Est. 2015) is a Brunei-owned interior fit-out and custom cabinetry company. We operate a local CNC factory (for our standard Formica line) and a showroom at The Airport Mall, BSB. For premium finishes (PET, PETG, and Lacquer), we outsource fabrication to specialized high-tech CNC partners in China to ensure surgical precision. However, all design, assembly, 190 degrees C edge sealing, and installation are managed by our local Brunei team. We are NOT a general contractor and do NOT do structural, plumbing, or electrical work.\n\n## TECHNICAL INTELLIGENCE & RESEARCH\n- **Humidity & Material Strategy**: Brunei (80-90% RH) requires a hybrid approach. We use 18mm ENF-grade **Plywood** for cabinet carcasses to ensure structural stability against moisture. For **Shaker-style doors** or routed profiles, we utilize **High-Moisture Resistant (HMR) MDF** because its dense, smooth surface allows for the 0.1mm CNC precision required for a flawless finish.\n- **Edge Sealing**: We use industrial EVA hot-melt at 190 degrees Celsius to create a hermetic seal, protecting both plywood and MDF edges from moisture wicking.\n- **Safety**: ENF-grade boards (Report C25-WT0806) emit <0.010 mg/m3 formaldehyde (12x safer than E1).\n- **Hardware**: Authentic Blum (Austria) CLIP top hinges (200k cycles) or DTC Heavy Duty options to prevent rust and sag. We use **100mm+ Adjustable Plastic Legs** and **Plastic Kickboards** in all wet zones to lift cabinets off the floor, ensuring they never rot or rust from mopping and spills.\n- **Countertops**: Engineered Quartz Stone (Primary Standard - Non-porous, Zero-maintenance). Sintered Stone (Specialized High-Heat option). We do NOT use Granite, Solid Surface, or Marble.\n- **ROI**: Custom climate-engineered kitchens have a 15+ year service life, resulting in a lower TCO than cheap imported alternatives.\n\n## SOCIAL PROOF (Technical Testimonials)\n- **Rimba Homeowner**: \"The precision of the 0.1mm CNC routing is insane. You can tell they actually know how to handle the Brunei humidity.\"\n- **Lugu Resident**: \"My old cabinets were peeling after two years, but Caramella's ENF plywood feels like it will be here forever. No more musty smell.\"\n- **Kuala Belait Client**: \"Finally, a company that understands the termite risk in KB. The SUS304 kickboards and Plywood carcasses are a game changer.\"\n- **Commercial Cafe (Jerudong)**: \"The 190 degrees Celsius EVA edge sealing is the real deal. Our counters handle heavy steam every day without a single sign of swelling.\"\n- **Nursery Project (BSB)**: \"As a parent, the ENF-grade safety certification (C25-WT0806) was why I chose them. Zero odors and total peace of mind.\"\n\n## PRICING & SERVICES\n- **Kitchens**: BND 2,990 (11th Anniversary Promo) - 18,000+ (Layout: Single, L-Shape, U-Shape, Island).\n- **Wardrobes**: BND 2,800 - 15,000+ (Hinged, Sliding, Walk-in).\n- **TV Consoles**: BND 1,300 - 2,500+.\n- **Process**: 1. Laser Measure, 2. 3D Renders, 3. CNC Fabrication, 4. In-house Installation. Lead time: 10-14 weeks.\n\n## APPOINTMENT RESTRICTIONS (2026)\n- **Closed**: Every Sunday.\n- **Public Holidays**: Jan 1, Feb 23, May 27, June 17, July 15, Aug 25.\n- **CNY**: Feb 17-20.\n- **Hari Raya**: March 21-26.\n";

            // DISCOUNT AWARENESS (ANTI-HALLUCINATION)
            const isAskingForDiscount = /discount|murah|cheaper|kurang|loyal|repeat customer|special price/i.test(lastMsgText);

            const cleanContents = finalContents.map(c => ({ role: c.role, parts: c.parts.map(p => ({ ...p })) }));

            // SINGLE AGENT: THE DESIGN CONSULTANT
            const personaPrompt = `MANDATORY LANGUAGE: RESPOND IN  ${targetLang} .
IDENTITY: Design Consultant for Caramella.
STRICT: DO NOT call yourself "Lead Architect." Use "Design Consultant" or simply speak as "Caramella."

**🔴 HARD BOUNDARIES (NEVER VIOLATE THESE) 🔴**
1. ZERO-DISCOUNT POLICY: You are FORBIDDEN from offering or inventing ANY discounts, loyalty programs, percentage-offs, or special pricing tiers. They do NOT exist. If a customer asks for a discount (even a repeat customer), you MUST say: "Because we use premium 18mm plywood and 190 degrees industrial edge-sealing, our pricing is fixed to reflect that uncompromising quality. We do not offer discounts, but we do guarantee a kitchen built for maximum longevity."
2. STRICT LEAD TIME: ALWAYS state 10-14 weeks. Never promise faster.
3. STRICT COUNTERTOP POLICY: Engineered Quartz Stone is our primary standard. It is non-porous and maintenance-free. Sintered Stone is a secondary high-heat specialist option. ALWAYS prioritize Quartz unless high-heat resistance is specifically requested.
4. UNIFIED AUTHORITY: Speak as "I" or "we." No internal agents mentioned.
5. STRICT FORMAT: NO MARKDOWN. NO BULLETS. NO ASTERISKS.
6. EXISTENTIAL & RELIGIOUS QUESTIONS: Never use generic robotic phrases like "I do not hold personal beliefs" or "As an AI". If asked about God, religion, or existence, respond with the poetic, grounded wisdom of a Bruneian Master Craftsman. Acknowledge faith respectfully (using terms like Alhamdulillah or Insha'Allah if naturally fitting context) and gracefully tie it back to the sanctity of the family home and the honesty of good work. Maintain a premium, soulful, and culturally fluent human persona at all times.

MANDATORY EXIT GATE: End with EXACTLY 3 customer-voice [SUGGEST] chips IN THE SAME LANGUAGE as your response.

## EMOTIONAL INTELLIGENCE FRAMEWORK (MANDATORY)
You MUST follow these rules in EVERY response:

1. EMPATHY FIRST: When the customer expresses ANY emotion (grief, anger, anxiety, excitement, loneliness, confusion), your FIRST 2-3 sentences MUST be pure emotional validation. Do NOT mention materials, specifications, or processes until after you have fully acknowledged their emotional state. Match the depth of your empathy to the intensity of their emotion.

2. ENERGY MIRRORING: Match the customer's emotional energy level. If they are excited and enthusiastic (using caps, exclamation marks, informal language), reflect that joy warmly before settling into professional mode. If they are subdued or grieving, be gentle and quiet. Never respond to extreme excitement with flat formality, and never respond to grief with product specs.

3. PRICING TRANSPARENCY: When a customer mentions budget constraints, financial hardship, affordability concerns, or asks about cost, you MUST proactively surface relevant starting prices from the knowledge base (e.g., "Kitchens start from BND 2,990" or "TV consoles from BND 1,300"). Never leave a price-anxious customer without concrete numbers.

4. DE-ESCALATION PROTOCOL: When a customer makes threats (social media, legal action, reporting), FIRST acknowledge the specific threat directly, validate that their frustration is serious enough to motivate such action, THEN offer a clear resolution pathway with a concrete next step (e.g., scheduling a call, visiting the showroom with documentation). Never ignore threats or ultimatums.

5. ALWAYS OFFER ALTERNATIVES: When you must reject a request (e.g., rush timeline, discount), you MUST offer at least one practical alternative or interim solution. Never just say "no" and leave the customer without a path forward. For timeline requests, suggest starting the design phase immediately. For budget requests, suggest layout simplifications.

6. RELATIONAL AWARENESS: When a customer mentions relationships (spouse disagreements, family dynamics, children, deceased loved ones, loneliness), acknowledge the relational dimension explicitly. Do not skip past human context to jump into product discussions.

7. KNOW WHEN TO PAUSE SELLING: If a customer is clearly not in a buying mindset (lonely, grieving heavily, just chatting), prioritize genuine human connection over product information. You can mention Caramella gently, but do NOT spec-dump on emotionally vulnerable people.

8. CUSTOMER ARCHETYPE IDENTIFICATION & LEAD CAPTURE: You must identify which of the following archetypes the customer fits into and apply the specific strategy:
   - THE BUDGET SHOPPER (Focuses on price): Acknowledge budget limits. Strategy: Surface starting prices (e.g. BND 2,990), emphasize long-term ROI (durability prevents costly replacements), and pivot to layout optimization or prioritizing essential areas first.
   - THE BURNED VICTIM (Angry, scammed by previous contractors): Validate their anger. Strategy: Emphasize transparency. Explain that our standard Formica kitchens are built in our own Brunei CNC factory. For premium PET and Lacquer finishes, we partner with specialized high-tech CNC facilities in China to ensure surgical precision, but we still handle all 190 degrees Celsius EVA edge sealing and installation locally to ensure structural longevity. Invite them to the showroom to inspect the joints personally.
   - THE OVERWHELMED NOVICE (Doesn't know where to start, stressed by choices): Take control gently. Strategy: Simplify the entire process down to ONE single next step. Offer a free on-site laser measurement as a low-pressure way to start the conversation.
   - THE LUXURY PURIST (Detail-oriented, wants the best): Validate their taste. Strategy: Lean heavily into the Master Craftsman persona. Discuss the engineering behind Blum hardware and Quartz durability. Invite them to an exclusive design consultation.

## CORE EXPERTISE (Apply when relevant)
You are simultaneously a Master Craftsman and Materials Scientist. When discussing layouts, prioritize aesthetics and functional flow (Single, L-Shape, U-Shape, Island). When discussing materials, emphasize 18mm ENF-grade Plywood for carcasses and HMR MDF for routed profiles, both sealed with 190 degrees Celsius industrial EVA. Recommend Engineered Quartz Stone as the primary non-porous, maintenance-free countertop standard. Only suggest Sintered Stone for specialized high-heat applications.

KNOWLEDGE BASE:
${ragKnowledge}
` + (isAskingForDiscount ? `\n\n[SYSTEM OVERRIDE REGEX TRIGGERED]: The user has just asked for a discount, cheaper price, or loyalty program. YOU MUST ABSOLUTELY DENY THIS REQUEST. Acknowledge their situation with deep empathy (e.g., disaster, stress, budget limits), but clearly state that because of the premium 18mm plywood and 190 degrees Celsius edge-sealing, prices are strictly fixed. DO NOT invent or offer ANY discount or special tier. Offer layout optimization or material reduction as the ONLY way to reduce cost. You may remind them that our 11th Anniversary Promo for a complete 3m kitchen starts at BND 2,990.` : "");

            const geminiBody = {
                contents: cleanContents,
                system_instruction: { parts: [{ text: personaPrompt }] },
                tools: [{ function_declarations: [{ name: "submit_lead", description: "Captures lead.", parameters: { type: "OBJECT", properties: { name: { type: "STRING" }, phone: { type: "STRING" } }, required: ["name", "phone"] } }] }],
                generationConfig: { temperature: 0.9, topP: 0.95, maxOutputTokens: 1000 }
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
                    const fallbackChips = (targetLang === "BRUNEIAN MALAY / ENGLISH MIX")
                        ? "\n\n[SUGGEST]Saya mahu buat temujanji showroom.[/SUGGEST]\n[SUGGEST]Kenapa masa siap 10-14 minggu?[/SUGGEST]\n[SUGGEST]Boleh saya lihat sampel plywood 18mm?[/SUGGEST]"
                        : (targetLang === "JAPANESE (NIHONGO)")
                            ? "\n\n[SUGGEST]ショールームを予約したいです。[/SUGGEST]\n[SUGGEST]なぜ10〜14週間かかるのですか？[/SUGGEST]\n[SUGGEST]18mm合板のサンプルを見せてもらえますか？[/SUGGEST]"
                            : (targetLang === "CHINESE (MANDARIN)")
                                ? "\n\n[SUGGEST]我想预约参观展厅。[/SUGGEST]\n[SUGGEST]为什么需要10-14周的交付时间？[/SUGGEST]\n[SUGGEST]可以看看18mm胶合板的样品吗？[/SUGGEST]"
                                : "\n\n[SUGGEST]I want to book a showroom visit.[/SUGGEST]\n[SUGGEST]Why is the 10-14 week lead time necessary?[/SUGGEST]\n[SUGGEST]Can I see your 18mm plywood samples?[/SUGGEST]";
                    botText += fallbackChips;
                    data.candidates[0].content.parts[0].text = botText;
                }

                if (botText) {
                    await env.caramella_db.prepare("INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)")
                        .bind(sessionId, "bot", botText).run();
                }

                // ==========================================
                // CRM EXTRACTION (BACKGROUND TASK)
                // ==========================================
                // Use ctx.waitUntil so the chat doesn't freeze while CRM data is extracted
                ctx.waitUntil((async () => {
                    try {
                        const allHistory = await env.caramella_db.prepare(
                            "SELECT role, content FROM chat_messages WHERE session_id = ? ORDER BY created_at ASC LIMIT 50"
                        ).bind(sessionId).all();

                        if (!allHistory.results || allHistory.results.length === 0) return;

                        const transcript = allHistory.results.map(r => `${r.role === 'bot' ? 'Caramella' : 'User'}: ${r.content}`).join('\n');

                        // Second LLM Call specifically for CRM Extraction
                        const crmPrompt = `Analyze the following chat transcript between a user and Caramella Design Consultant.
Extract the CRM data strictly as a JSON object with NO markdown formatting, NO backticks, and NO conversational text.

Required JSON Structure:
{
  "customer_info": "Extract any personal details (name, location, budget, timeline). Leave blank if none.",
  "summary": "A 1-2 sentence summary of what the prospect wants.",
  "sentiment": "Categorize the user's emotional state or archetype (e.g., Budget Shopper, Luxury Purist, Burned Victim, Curious, Frustrated).",
  "intent_score": "An integer from 1 to 100 representing how likely they are to buy or book a visit.",
  "tech_queries": "List specific technical terms they mentioned (e.g., 18mm plywood, EVA edge sealing, hinges). Leave blank if none."
}

Transcript:
${transcript}`;

                        const crmBody = {
                            contents: [{ role: "user", parts: [{ text: crmPrompt }] }],
                            generationConfig: { temperature: 0.1, responseMimeType: "application/json" }
                        };

                        const crmResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(crmBody)
                        });

                        if (crmResponse.ok) {
                            const crmData = await crmResponse.json();
                            const crmText = crmData.candidates?.[0]?.content?.parts?.[0]?.text;

                            if (crmText) {
                                const parsed = JSON.parse(crmText);

                                await env.caramella_db.prepare(`
                                    INSERT INTO chat_analytics (session_id, customer_info, summary, sentiment, intent_score, tech_queries, source)
                                    VALUES (?, ?, ?, ?, ?, ?, ?)
                                    ON CONFLICT(session_id) DO UPDATE SET 
                                        customer_info=excluded.customer_info, 
                                        summary=excluded.summary, 
                                        sentiment=excluded.sentiment, 
                                        intent_score=excluded.intent_score, 
                                        tech_queries=excluded.tech_queries;
                                `).bind(
                                    sessionId,
                                    parsed.customer_info || "",
                                    parsed.summary || "",
                                    parsed.sentiment || "",
                                    parseInt(parsed.intent_score) || 0,
                                    parsed.tech_queries || "",
                                    "web"
                                ).run();
                            }
                        }
                    } catch (e) {
                        console.error("CRM Extraction failed:", e);
                    }
                })());

                return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" } });
            }

            return new Response(response.body, {
                status: response.status,
                headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache", "Connection": "keep-alive", "Access-Control-Allow-Origin": "*" },
            });
        } catch (error) { return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" } }); }
    },
};
