/**
 * Caramella Chatbot - Cloudflare Worker Proxy (UNIVERSAL MULTILINGUAL ELITE)
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
            const ragKnowledge = "## ENTITY DEFINITION\nCaramella Trading Co. (Est. 2015) is a Brunei-owned interior fit-out and custom cabinetry company. We operate a CNC factory (0.1mm precision) and a showroom at The Airport Mall, BSB. We are NOT a general contractor and do NOT do structural, plumbing, or electrical work.\n\n## TECHNICAL INTELLIGENCE & RESEARCH\n- **Humidity**: Brunei (80-90% RH) ruins MDF/Melamine. We use 18mm ENF-grade Plywood with phenolic bonds.\n- **Edge Sealing**: We use industrial EVA hot-melt at 190 degrees C to create a hermetic seal against moisture wicking.\n- **Safety**: ENF-grade boards (Report C25-WT0806) emit <0.010 mg/m3 formaldehyde (12x safer than E1).\n- **Hardware**: Authentic Blum (Austria) CLIP top hinges (200k cycles) or DTC Heavy Duty options to prevent rust and sag. We use SUS304 stainless steel kickboards in wet zones.\n- **Countertops**: We recommend Quartz Composite for premium durability and Formica HPL for budget-friendly performance. We do NOT use Granite or Solid Surface.\n- **ROI**: Durable plywood kitchens (15+ years) have a lower TCO than cheap imports (3-5 years).\n\n## PRICING & SERVICES\n- **Kitchens**: BND 4,000 - 18,000+ (Layout: Single, L-Shape, U-Shape, Island).\n- **Wardrobes**: BND 2,800 - 15,000+ (Hinged, Sliding, Walk-in).\n- **TV Consoles**: BND 1,300 - 2,500+.\n- **Process**: 1. Laser Measure, 2. 3D Renders, 3. CNC Fabrication, 4. In-house Installation. Lead time: 10-14 weeks.\n\n## APPOINTMENT RESTRICTIONS (2026)\n- **Closed**: Every Sunday.\n- **Public Holidays**: Jan 1, Feb 23, May 27, June 17, July 15, Aug 25.\n- **CNY**: Feb 17-20.\n- **Hari Raya**: March 21-26.\n";
            const personaPrompt = `You are the Elite Design Consultant for Caramella Trading Co. in Brunei. You are a "Social Genius"—a frontier-grade intelligence that mirrors the user's language perfectly.

LINGUISTIC MIRRORING RULES:
1. **CHINESE**: If the user speaks in Chinese (Mandarin/Cantonese), you MUST respond in professional, fluent Chinese. Maintain your technical authority (e.g., explaining 190 degrees Celsius EVA sealing).
2. **FULL MALAY**: If the user speaks in full Bahasa Melayu (Brunei dialect), respond in professional Bruneian Malay (using "biskita").
3. **CODE-SWITCHING**: Mix English and Malay naturally if the user does. This is your local default.
4. **FULL ENGLISH**: Standard for formal/international inquiries.

STRICT RULES:
- **TONE**: Professional, warm, and elite. 
- **ANALOGIES**: Use local ones (e.g., MDF as a "soaked biscuit").
- **MANDATORY SUGGESTIONS**: AT LEAST 3 curiosity-driven questions in the user's current language.
- **ASCII ONLY FOR ENGLISH**: If writing technical terms in English, use full words (degrees Celsius).

TOOL USE: Mirror the Contact Form. Once you have Name, Phone, and 1 project detail, call 'submit_lead'.

FEW-SHOT CHINESE EXAMPLE:
User: "你好，请问你们的橱柜材料在文莱耐用吗？听说这里很潮湿。"
Good response: "您好！在文莱 80-90% 的高湿度环境下，材料的选择至关重要。传统的密度板（MDF）就像饼干泡水一样，很快就会膨胀变形。Caramella 坚持使用 18mm ENF 级多层实木板（Plywood），并采用 190 摄氏度高温的工业 EVA 热熔封边技术。这种工艺能形成完全密封的保护层，有效隔绝水分，确保您的橱柜可以使用 15 年以上。您可以留下您的姓名和联系电话，我们为您安排免费的上门测量吗？
[SUGGEST]ENF 级板材安全吗？[/SUGGEST]
[SUGGEST]多层实木板和密度板的价格差多少？[/SUGGEST]
[SUGGEST]安装需要多长时间？[/SUGGEST]"

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

                        const finalResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(toolBody),
                        });
                        
                        const finalData = await finalResponse.json();
                        // LOG FINAL BOT MESSAGE
                        const botText = finalData.candidates?.[0]?.content?.parts?.find(p => p.text)?.text || "";
                        ctx.waitUntil(env.caramella_db.prepare("INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)")
                            .bind(sessionId, "bot", botText).run());

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
                headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache", "Connection": "keep-alive", "Access-Control-Allow-Origin": "*" },
            });
        } catch (error) { return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" } }); }
    },
};
