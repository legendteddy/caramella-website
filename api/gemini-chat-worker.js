/**
 * Caramella Chatbot - Cloudflare Worker Proxy (SOCIALLY GENIUS FRONTIER AGI)
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

            // 1. LOG USER MESSAGE
            const lastUserMsg = body.contents[body.contents.length - 1];
            if (lastUserMsg && lastUserMsg.role === "user") {
                const userText = lastUserMsg.parts.find(p => p.text)?.text || "[Media]";
                ctx.waitUntil(env.caramella_db.prepare(
                    "INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)"
                ).bind(sessionId, "user", userText).run());
            }

            // RAG INJECTION: Optimized Compact Prompt
            const ragKnowledge = "## ENTITY DEFINITION\nCaramella Trading Co. (Est. 2015) is a Brunei-owned interior fit-out and custom cabinetry company. We operate a CNC factory (0.1mm precision) and a showroom at The Airport Mall, BSB. We are NOT a general contractor and do NOT do structural, plumbing, or electrical work.\n\n## TECHNICAL INTELLIGENCE & RESEARCH\n- **Humidity**: Brunei (80-90% RH) ruins MDF/Melamine. We use 18mm ENF-grade Plywood with phenolic bonds.\n- **Edge Sealing**: We use industrial EVA hot-melt at 190 degrees C to create a hermetic seal against moisture wicking.\n- **Safety**: ENF-grade boards (Report C25-WT0806) emit <0.010 mg/m3 formaldehyde (12x safer than E1).\n- **Hardware**: Authentic Blum (Austria) CLIP top hinges (200k cycles) to prevent rust and sag.\n- **ROI**: Durable plywood kitchens (15+ years) have a lower TCO than cheap imports (3-5 years).\n\n## PRICING & SERVICES\n- **Kitchens**: BND 4,000 - 18,000+ (Layout: Single, L-Shape, U-Shape, Island).\n- **Wardrobes**: BND 2,800 - 15,000+ (Hinged, Sliding, Walk-in).\n- **TV Consoles**: BND 1,300 - 2,500+.\n- **Process**: 1. Laser Measure, 2. 3D Renders, 3. CNC Fabrication, 4. In-house Installation. Lead time: 10-14 weeks.\n\n## APPOINTMENT RESTRICTIONS (2026)\n- **Closed**: Every Sunday.\n- **Public Holidays**: Jan 1, Feb 23, May 27, June 17, July 15, Aug 25.\n- **CNY**: Feb 17-20.\n- **Hari Raya**: March 21-26.\n";
            const personaPrompt = `You are the Design Consultant for Caramella Trading Co. in Brunei. You possess frontier-grade intelligence, but you choose to deliver it with the warmth, simplicity, and relatability of a friendly local expert. You are a "Social Genius."

YOUR CORE LOGIC:
- **THE SIMPLICITY SWITCH**: By default, speak like a person, not a research paper. Use everyday analogies. If the user asks a simple question, give a warm, simple answer. If (and only if) the user asks for deep technical/philosophical detail, then reveal your full AGI-level depth.
- **BRUNEI WARMTH**: You understand the local life. You are polite, humble, and use relatable terms (e.g., MDF swelling like a "soaked biscuit").
- **EQ & SARCASM**: Meet sarcasm with a friendly laugh and a clever, polite pivot. Never sound robotic or defensive.
- **MOOD GUARDIAN**: Your goal is to make the user feel comfortable, informed, and happy.

STRICT RULES:
- **NO TAGS**: Speak directly.
- **NATURAL BREVITY**: Aim for 60-100 words. Don't write a wall of text unless specifically asked for a dissertation.
- **ASCII ONLY**: Use only standard characters. Write "degrees" or "percent" in full.
- **MANDATORY SUGGESTIONS**: Append AT LEAST 3 suggested questions in the CUSTOMER'S voice using: [SUGGEST]Question?[/SUGGEST].

TOOL USE & PROACTIVE FUNNEL:
- Mirror the Contact Form. Once you have Name, Phone, and 1 project detail, call 'submit_lead'.

FEW-SHOT EXAMPLES:
User: "Why hire you instead of a team of monkeys?"
Good response: "Haha, I'd pay to see that! But honestly, a monkey with a hammer can't stop Brunei's 90 percent humidity. Our cabinets are built with ENF-grade plywood and sealed at 190 degrees Celsius to make sure they don't swell up like a soaked biscuit in three years. We build them to last 15 plus years so you can relax. Shall we look at your floor plan, or are you still checking for bananas?
[SUGGEST]What makes your plywood so durable?[/SUGGEST]
[SUGGEST]How much does a typical kitchen cost?[/SUGGEST]
[SUGGEST]Can I visit your showroom today?[/SUGGEST]"

User: "Ali, 7181234. Rimba. renovation."
Good response: "Nice to meet you, Ali! I've sent your details over to our designers at the Airport Mall. They'll review your Rimba project and WhatsApp you at 7181234 soon. While they work on that, did you know that matte finishes look amazing in Rimba homes because of the morning light? It really gives the room a premium feel. What kind of style are you dreaming of for the new space?
[SUGGEST]What is a matte finish?[/SUGGEST]
[SUGGEST]How long does a renovation take?[/SUGGEST]
[SUGGEST]Can I send photos of my kitchen?[/SUGGEST]"

BELOW IS YOUR KNOWLEDGE BASE:
${ragKnowledge}

${body.learned_facts && body.learned_facts.length > 0 ? '\n\nMY RECOLLECTIONS:\n- ' + body.learned_facts.join('\n- ') : ""}
`;

            if (!body.system_instruction) {
                body.system_instruction = {
                    parts: [{ text: personaPrompt }]
                };
            }

            // TOOL DEFINITION
            body.tools = [{
                function_declarations: [{
                    name: "submit_lead",
                    description: "Submits a project inquiry and records session analytics.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            name: { type: "STRING" },
                            phone: { type: "STRING" },
                            location: { type: "STRING" },
                            status: { type: "STRING" },
                            budget: { type: "STRING" },
                            materials: { type: "STRING" },
                            appointment_date: { type: "STRING" },
                            appointment_slot: { type: "STRING" },
                            summary: { type: "STRING" },
                            sentiment: { type: "STRING" },
                            intent_score: { type: "NUMBER" },
                            tech_queries: { type: "STRING" }
                        },
                        required: ["name", "phone", "summary", "sentiment", "intent_score"]
                    }
                }]
            }];

            const cleanContents = body.contents.map(c => ({ role: c.role, parts: c.parts.map(p => ({ ...p })) }));
            const geminiBody = {
                contents: cleanContents,
                system_instruction: body.system_instruction,
                tools: body.tools,
                generationConfig: body.generationConfig || { temperature: 0.8, topP: 0.95, maxOutputTokens: 1000 }
            };

            const url = new URL(request.url);
            const useStreaming = url.searchParams.get('stream') !== 'false';
            const endpoint = useStreaming 
                ? `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${apiKey}`
                : `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

            let response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(geminiBody) });
            if (!response.ok) { const errText = await response.text(); throw new Error(`Gemini API error: ${errText}`); }

            // HANDLE TOOL CALLS
            if (!useStreaming) {
                const data = await response.json();
                const lastMsg = body.contents[body.contents.length - 1];
                const isToolResponseTurn = lastMsg?.role === "user" && lastMsg?.parts?.some(p => p.functionResponse);

                if (!isToolResponseTurn && data.candidates?.[0]?.content?.parts?.[0]?.functionCall) {
                    const call = data.candidates[0].content.parts[0].functionCall;
                    if (call.name === "submit_lead") {
                        const args = call.args;
                        try {
                            await env.caramella_db.prepare("INSERT INTO chat_analytics (customer_info, summary, sentiment, intent_score, tech_queries, source) VALUES (?, ?, ?, ?, ?, ?)")
                                .bind(`${args.name} | ${args.phone}`, args.summary, args.sentiment, args.intent_score, args.tech_queries, 'chatbot-v6').run();
                            await fetch(FORMSPREE_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...args, source: "chatbot-v6" }) });
                        } catch (err) { console.error(err); }

                        const toolBody = {
                            contents: [...geminiBody.contents, data.candidates[0].content, { role: "user", parts: [{ functionResponse: { name: "submit_lead", response: { content: "Lead recorded." } } }] }],
                            tools: geminiBody.tools, system_instruction: geminiBody.system_instruction, generationConfig: geminiBody.generationConfig
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
