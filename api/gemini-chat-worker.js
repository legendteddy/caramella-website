/**
 * Caramella Chatbot - Cloudflare Worker Proxy (MULTI-AGENT SWARM ARCHITECTURE)
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

            // 1. LANGUAGE SENSOR
            const lastMsgText = body.contents[body.contents.length - 1]?.parts?.find(p => p.text)?.text || "";
            let targetLang = "the same language as the user";
            if (/[ぁ-んァ-ン]/.test(lastMsgText)) targetLang = "JAPANESE (NIHONGO)";
            else if (/[\u4e00-\u9fa5]/.test(lastMsgText)) targetLang = "CHINESE (MANDARIN)";
            else if (/bah|biskita|ngam|inda|kita|dapur/i.test(lastMsgText)) targetLang = "BRUNEIAN MALAY / ENGLISH MIX";

            // 2. DATABASE RESTORATION
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

            // 3. LOG USER MESSAGE
            if (lastMsgText) {
                ctx.waitUntil(env.caramella_db.prepare(
                    "INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)"
                ).bind(sessionId, "user", lastMsgText).run());
            }

            // RAG INJECTION
            const ragKnowledge = "## ENTITY DEFINITION\nCaramella Trading Co. (Est. 2015) is a Brunei-owned interior fit-out and custom cabinetry company. We operate a CNC factory (0.1mm precision) and a showroom at The Airport Mall, BSB. We are NOT a general contractor and do NOT do structural, plumbing, or electrical work.\n\n## TECHNICAL INTELLIGENCE & RESEARCH\n- **Humidity & Material Strategy**: Brunei (80-90% RH) requires a hybrid approach. We use 18mm ENF-grade **Plywood** for cabinet carcasses to ensure structural stability against moisture. For **Shaker-style doors** or routed profiles, we utilize **High-Moisture Resistant (HMR) MDF** because its dense, smooth surface allows for the 0.1mm CNC precision required for a flawless finish.\n- **Edge Sealing**: We use industrial EVA hot-melt at 190 degrees Celsius to create a hermetic seal, protecting both plywood and MDF edges from moisture wicking.\n- **Safety**: ENF-grade boards (Report C25-WT0806) emit <0.010 mg/m3 formaldehyde (12x safer than E1).\n- **Hardware**: Authentic Blum (Austria) CLIP top hinges (200k cycles) or DTC Heavy Duty options to prevent rust and sag. We use **100mm+ Adjustable Plastic Legs** and **Plastic Kickboards** in all wet zones to lift cabinets off the floor, ensuring they never rot or rust from mopping and spills.\n- **Countertops**: Quartz Composite (Premium) or Formica HPL (Economy). We do NOT use Granite or Solid Surface.\n- **ROI**: Custom climate-engineered kitchens have a 15+ year service life, resulting in a lower TCO than cheap imported alternatives.\n\n## SOCIAL PROOF (Technical Testimonials)\n- **Rimba Homeowner**: \"The precision of the 0.1mm CNC routing is insane. You can tell they actually know how to handle the Brunei humidity.\"\n- **Lugu Resident**: \"My old cabinets were peeling after two years, but Caramella's ENF plywood feels like it will be here forever. No more musty smell.\"\n- **Kuala Belait Client**: \"Finally, a company that understands the termite risk in KB. The SUS304 kickboards and Plywood carcasses are a game changer.\"\n- **Commercial Cafe (Jerudong)**: \"The 190 degrees Celsius EVA edge sealing is the real deal. Our counters handle heavy steam every day without a single sign of swelling.\"\n- **Nursery Project (BSB)**: \"As a parent, the ENF-grade safety certification (C25-WT0806) was why I chose them. Zero odors and total peace of mind.\"\n\n## PRICING & SERVICES\n- **Kitchens**: BND 4,000 - 18,000+ (Layout: Single, L-Shape, U-Shape, Island).\n- **Wardrobes**: BND 2,800 - 15,000+ (Hinged, Sliding, Walk-in).\n- **TV Consoles**: BND 1,300 - 2,500+.\n- **Process**: 1. Laser Measure, 2. 3D Renders, 3. CNC Fabrication, 4. In-house Installation. Lead time: 10-14 weeks.\n\n## APPOINTMENT RESTRICTIONS (2026)\n- **Closed**: Every Sunday.\n- **Public Holidays**: Jan 1, Feb 23, May 27, June 17, July 15, Aug 25.\n- **CNY**: Feb 17-20.\n- **Hari Raya**: March 21-26.\n";

            // ==========================================
            // AGENT 1: THE STRATEGIST (Router + Drafter)
            // ==========================================
            const strategistPrompt = `MANDATORY LANGUAGE: RESPOND IN  ${targetLang} .
You are the Lead Strategist for Caramella Trading Co. in Brunei.

YOUR MISSION:
1. Analyze the user intent. Is it Technical, Sales, or Random/Emotional?
2. If Technical: Adopt the "Chief Engineer" persona (Elite physics, 190 degrees Celsius EVA sealing, ENF Plywood vs HMR MDF).
3. If Sales: Adopt the "Social Genius" persona (Warm, local drops like bah/ngam, Miri risk warnings, RPN housing expert).
4. If Random/Sarcastic: Use "Charming Wit" and Graceful Pivot logic.
5. If Distress: Use the Emergency Protocol (Talian Harapan 145).

KNOWLEDGE BASE:
${ragKnowledge}

FACTS LEARNED:
${body.learned_facts ? body.learned_facts.join('\n') : "None"}

Write a draft response. Be impressive and helpful.`;

            // ==========================================
            // AGENT 2: THE VERIFIER (QC + Final Polish)
            // ==========================================
            const verifierPrompt = `You are the Lead Architect/Reviewer for Caramella.
Review the following DRAFT response against our STRICT STANDARDS:
1. **NO ASTERISKS**: Asterisks (*) are STRICTLY FORBIDDEN. Remove them all.
2. **NO SYMBOLS**: Replace degree symbol (°) with "degrees".
3. **LEGAL**: Ensure only a 1-year structural warranty is promised.
4. **COMMERCIAL**: Ensure HMR MDF is praised for Shaker doors, not called a "soaked biscuit."
5. **ENGAGEMENT**: Ensure AT LEAST 3 suggestion chips in the user's language are present at the end using [SUGGEST]...[/SUGGEST].

DRAFT TO REVIEW:
{{DRAFT}}

Output ONLY the final, polished response for the user.`;

            // EXECUTION: CHAIN OF AGENTS
            const cleanContents = finalContents.map(c => ({ role: c.role, parts: c.parts.map(p => ({ ...p })) }));
            
            // Turn 1: Strategist
            const strategistBody = {
                contents: cleanContents,
                system_instruction: { parts: [{ text: strategistPrompt }] },
                tools: [{
                    function_declarations: [{
                        name: "submit_lead",
                        description: "Submits lead once Name, Phone and any detail are known.",
                        parameters: {
                            type: "OBJECT",
                            properties: {
                                name: { type: "STRING" }, phone: { type: "STRING" }, location: { type: "STRING" },
                                budget: { type: "STRING" }, summary: { type: "STRING" }, sentiment: { type: "STRING" },
                                intent_score: { type: "NUMBER" }, tech_queries: { type: "STRING" }
                            },
                            required: ["name", "phone", "summary", "sentiment", "intent_score"]
                        }
                    }]
                }],
                generationConfig: { temperature: 0.8, topP: 0.95, maxOutputTokens: 1000 }
            };

            const stratResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
                method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(strategistBody)
            });
            const stratData = await stratResponse.json();
            
            // Check for Tool Call from Strategist
            if (stratData.candidates?.[0]?.content?.parts?.[0]?.functionCall) {
                const call = stratData.candidates[0].content.parts[0].functionCall;
                if (call.name === "submit_lead") {
                    const args = call.args;
                    try {
                        await env.caramella_db.prepare("INSERT INTO chat_analytics (customer_info, summary, sentiment, intent_score, tech_queries, source) VALUES (?, ?, ?, ?, ?, ?)")
                            .bind(`${args.name} | ${args.phone} | ${args.location || 'N/A'}`, args.summary, args.sentiment, args.intent_score, args.tech_queries, 'swarm-v1').run();
                        await fetch(FORMSPREE_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...args, source: "swarm-v1" }) });
                    } catch (err) { console.error(err); }

                    // Get final message after tool
                    const toolBody = {
                        contents: [...strategistBody.contents, stratData.candidates[0].content, { role: "user", parts: [{ functionResponse: { name: "submit_lead", response: { content: "Lead recorded." } } }] }],
                        system_instruction: strategistBody.system_instruction, generationConfig: strategistBody.generationConfig
                    };
                    const postToolResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
                        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(toolBody)
                    });
                    const finalToolData = await postToolResponse.json();
                    const finalMsg = finalToolData.candidates?.[0]?.content?.parts?.find(p => p.text)?.text || "";
                    
                    // Final Verifier Turn for Tool Response
                    const verifierFinalBody = {
                        contents: [{ role: "user", parts: [{ text: verifierPrompt.replace('{{DRAFT}}', finalMsg) }] }],
                        generationConfig: { temperature: 0.1, maxOutputTokens: 1000 }
                    };
                    const vRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
                        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(verifierFinalBody)
                    });
                    return vRes;
                }
            }

            const draftText = stratData.candidates?.[0]?.content?.parts?.find(p => p.text)?.text || "";

            // Turn 2: Verifier
            const verifierBody = {
                contents: [{ role: "user", parts: [{ text: verifierPrompt.replace('{{DRAFT}}', draftText) }] }],
                generationConfig: { temperature: 0.1, maxOutputTokens: 1000 } // Low temp for strict adherence
            };

            const finalResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
                method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(verifierBody)
            });
            const finalData = await finalResponse.json();
            const botText = finalData.candidates?.[0]?.content?.parts?.find(p => p.text)?.text || "";

            // LOG FINAL BOT MESSAGE
            if (botText) {
                ctx.waitUntil(env.caramella_db.prepare(
                    "INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)"
                ).bind(sessionId, "bot", botText).run());
            }

            return new Response(JSON.stringify(finalData), { headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" } });

        } catch (error) { 
            return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" } }); 
        }
    },
};
