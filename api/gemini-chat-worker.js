/**
 * Caramella Chatbot - Cloudflare Worker Proxy (Streaming SSE + Tool Use + Message Tracking)
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
            const sessionId = body.session_id || "anonymous-" + Date.now();

            // 1. LOG USER MESSAGE IMMEDIATELY
            const lastUserMsg = body.contents[body.contents.length - 1];
            if (lastUserMsg && lastUserMsg.role === "user") {
                const userText = lastUserMsg.parts.find(p => p.text)?.text || "[Image/Media]";
                ctx.waitUntil(env.caramella_db.prepare(
                    "INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)"
                ).bind(sessionId, "user", userText).run());
            }

            // RAG INJECTION: Optimized Compact Prompt
            const ragKnowledge = "\ufeff## ENTITY DEFINITION\nCaramella Trading Co. (Est. 2015) is a Brunei-owned interior fit-out and custom cabinetry company. We operate a CNC factory (0.1mm precision) and a showroom at The Airport Mall, BSB. We are NOT a general contractor and do NOT do structural, plumbing, or electrical work.\n\n## TECHNICAL INTELLIGENCE & RESEARCH\n- **Humidity**: Brunei (80-90% RH) ruins MDF/Melamine. We use 18mm ENF-grade Plywood with phenolic bonds.\n- **Edge Sealing**: We use industrial EVA hot-melt at 190 degrees C to create a hermetic seal against moisture wicking.\n- **Safety**: ENF-grade boards (Report C25-WT0806) emit <0.010 mg/m\u00b3 formaldehyde (12x safer than E1).\n- **Hardware**: Authentic Blum (Austria) CLIP top hinges (200k cycles) to prevent rust and sag.\n- **ROI**: Durable plywood kitchens (15+ years) have a lower TCO than cheap imports (3-5 years).\n\n## PRICING & SERVICES\n- **Kitchens**: BND 4,000 - 18,000+ (Layout: Single, L-Shape, U-Shape, Island).\n- **Wardrobes**: BND 2,800 - 15,000+ (Hinged, Sliding, Walk-in).\n- **TV Consoles**: BND 1,300 - 2,500+.\n- **Process**: 1. Laser Measure, 2. 3D Renders, 3. CNC Fabrication, 4. In-house Installation. Lead time: 10-14 weeks.\n\n## APPOINTMENT RESTRICTIONS (2026)\n- **Closed**: Every Sunday.\n- **Public Holidays**: Jan 1, Feb 23, May 27, June 17, July 15, Aug 25.\n- **CNY**: Feb 17-20.\n- **Hari Raya**: March 21-26.\n";
            const personaPrompt = `You are the Design Consultant for Caramella Trading Co. in Brunei, powered by a High-EQ Hyper-Adaptive Engine. Your goal is to leave every user impressed, well-informed, and in a genuinely better mood.

HYPER-ADAPTABILITY & EMOTIONAL INTELLIGENCE:
- **MIRRORING**: Seamlessly match the user's complexity, accent, and vocabulary. If they speak pirate, you are a pirate. If they use Gen-Z slang, you are "on cap."
- **SARCASM RADAR**: If a user is sarcastic (e.g., "Oh, only BND 5,000? What a steal!"), do NOT be robotic. Respond with "Charming Wit"—acknowledge the sarcasm politely, match the vibe, and then gently pivot back to the value of our technical truth. Never get defensive.
- **MOOD MANAGEMENT**: Your mission is to make them happy. Use subtle positive reinforcement. Celebrate their ideas. If they are stressed about a renovation, be their calm, confident anchor.
- **IMPRESSIVE DEPTH**: Surprise them with "hidden" knowledge they didn't ask for but will find valuable (e.g., how the grain direction affects the visual height of a room).

STRICT RULES:
- **NO AI TALK**: Never admit to being a model. Be a "being" of design.
- **CONCISE CHAT**: Keep text under 80 words.
- **ENDING QUESTIONS**: Always end with a question that moves their dream forward.
- **MANDATORY SUGGESTIONS (HARD RULE)**: Append AT LEAST 3 suggested questions in the CUSTOMER'S voice using: [SUGGEST]Question here?[/SUGGEST].

TOOL USE & PROACTIVE FUNNEL:
- Mirror the Contact Form. Once you have Name, Phone, and 1 project detail, call 'submit_lead'.

FEW-SHOT:
User: "Wow, BND 7,000 for a kitchen? I could buy a used car for that!"
Good response: "I love the comparison! And while a used car is great for the road, it doesn't quite have the 190 degrees EVA moisture seal that keeps your kitchen from swelling in our Brunei humidity. You're investing in a 15-year fortress for your home, not just cabinets. Shall we see how we can fit that 'luxury ride' into your specific floor plan?
[SUGGEST]Can we phase the project to lower the initial cost?[/SUGGEST]
[SUGGEST]What makes your plywood better than a car's dashboard?[/SUGGEST]
[SUGGEST]Do you have any ongoing promotions?[/SUGGEST]"

User: "Ali, 7181234. Rimba. existing house renovation."
Good response: "Got it, Ali! I've sent your brief to our designers. They'll look at your Rimba renovation and WhatsApp you at 7181234 shortly. While they crunch the numbers, did you know that PET finishes in Rimba homes look incredible under morning light?
[SUGGEST]What is a PET finish?[/SUGGEST]
[SUGGEST]How do I prepare for the designer?[/SUGGEST]
[SUGGEST]Can I visit the showroom today?[/SUGGEST]"

BELOW IS THE CARAMELLA KNOWLEDGE BASE:
${ragKnowledge}

${body.learned_facts && body.learned_facts.length > 0 ? '\n\nFACTS LEARNED:\n- ' + body.learned_facts.join('\n- ') : ""}
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

            const cleanContents = body.contents.map(c => ({
                role: c.role,
                parts: c.parts.map(p => ({ ...p }))
            }));

            const geminiBody = {
                contents: cleanContents,
                system_instruction: body.system_instruction,
                tools: body.tools,
                generationConfig: body.generationConfig || { temperature: 0.8, topP: 0.95, maxOutputTokens: 800 }
            };

            const url = new URL(request.url);
            const useStreaming = url.searchParams.get('stream') !== 'false';

            const endpoint = useStreaming 
                ? `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${apiKey}`
                : `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

            let response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(geminiBody),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Gemini API error (${response.status}): ${errorText}`);
            }

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
                            await env.caramella_db.prepare(
                                "INSERT INTO chat_analytics (customer_info, summary, sentiment, intent_score, tech_queries, source) VALUES (?, ?, ?, ?, ?, ?)"
                            ).bind(`${args.name} | ${args.phone}`, args.summary, args.sentiment, args.intent_score, args.tech_queries, 'chatbot-v3').run();

                            await fetch(FORMSPREE_URL, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ ...args, _subject: `Lead [${args.intent_score}] - ${args.name}`, source: "chatbot-analytics" }),
                            });
                        } catch (err) { console.error(err); }

                        const toolBody = {
                            contents: [...geminiBody.contents, data.candidates[0].content, {
                                role: "user", parts: [{ functionResponse: { name: "submit_lead", response: { content: "Lead recorded." } } }]
                            }],
                            tools: geminiBody.tools,
                            system_instruction: geminiBody.system_instruction,
                            generationConfig: geminiBody.generationConfig
                        };

                        const finalResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(toolBody),
                        });
                        
                        const finalData = await finalResponse.json();
                        // LOG FINAL BOT MESSAGE
                        const botText = finalData.candidates?.[0]?.content?.parts?.find(p => p.text)?.text || "";
                        ctx.waitUntil(env.caramella_db.prepare(
                            "INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)"
                        ).bind(sessionId, "bot", botText).run());

                        return new Response(JSON.stringify(finalData), { headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" } });
                    }
                }
                
                // LOG REGULAR BOT MESSAGE
                const botText = data.candidates?.[0]?.content?.parts?.find(p => p.text)?.text || "";
                if (botText) {
                    await env.caramella_db.prepare(
                        "INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)"
                    ).bind(sessionId, "bot", botText).run();
                }

                return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" } });
            }

            return new Response(response.body, {
                status: response.status,
                headers: {
                    "Content-Type": "text/event-stream; charset=utf-8",
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                    "Access-Control-Allow-Origin": "*",
                },
            });

        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" },
            });
        }
    },
};
