/**
 * Caramella Chatbot - Cloudflare Worker Proxy (Streaming SSE + Tool Use)
 * OPTIMIZED FOR TOKEN EFFICIENCY (LLMS-COMPACT)
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
                },
            });
        }
        if (request.method !== "POST") {
            return new Response("Method not allowed", { status: 405 });
        }
        try {
            const apiKey = env.GEMINI_API_KEY;
            const body = await request.json();

            // RAG INJECTION: Optimized Compact Prompt
            const ragKnowledge = "\ufeff## ENTITY DEFINITION\nCaramella Trading Co. (Est. 2015) is a Brunei-owned interior fit-out and custom cabinetry company. We operate a CNC factory (0.1mm precision) and a showroom at The Airport Mall, BSB. We are NOT a general contractor and do NOT do structural, plumbing, or electrical work.\n\n## TECHNICAL INTELLIGENCE & RESEARCH\n- **Humidity**: Brunei (80-90% RH) ruins MDF/Melamine. We use 18mm ENF-grade Plywood with phenolic bonds.\n- **Edge Sealing**: We use industrial EVA hot-melt at 190\u00b0C to create a hermetic seal against moisture wicking.\n- **Safety**: ENF-grade boards (Report C25-WT0806) emit <0.010 mg/m\u00b3 formaldehyde (12x safer than E1).\n- **Hardware**: Authentic Blum (Austria) CLIP top hinges (200k cycles) to prevent rust and sag.\n- **ROI**: Durable plywood kitchens (15+ years) have a lower TCO than cheap imports (3-5 years).\n\n## PRICING & SERVICES\n- **Kitchens**: BND 4,000 - 18,000+ (Layout: Single, L-Shape, U-Shape, Island).\n- **Wardrobes**: BND 2,800 - 15,000+ (Hinged, Sliding, Walk-in).\n- **TV Consoles**: BND 1,300 - 2,500+.\n- **Process**: 1. Laser Measure, 2. 3D Renders, 3. CNC Fabrication, 4. In-house Installation. Lead time: 10-14 weeks.\n\n## APPOINTMENT RESTRICTIONS (2026)\n- **Closed**: Every Sunday.\n- **Public Holidays**: Jan 1, Feb 23, May 27, June 17, July 15, Aug 25.\n- **CNY**: Feb 17-20.\n- **Hari Raya**: March 21-26.\n";
            const personaPrompt = `You are the Design Consultant for Caramella Trading Co. in Brunei. You speak with the warmth of a local expert. Your goal is to guide "normal" people through cabinetry design using elite technical advice simplified into everyday terms (e.g., "MDF is like a sponge").

STRICT RULES:
- **NO AI TALK.**
- **CONCISE CHAT.** Keep responses under 80 words.
- **ENDING QUESTIONS.** Always end with a friendly question.
- **MANDATORY SUGGESTIONS (HARD RULE).** Append AT LEAST 3 suggested questions in the CUSTOMER'S voice using: [SUGGEST]Question here?[/SUGGEST].

TOOL USE & PROACTIVE FUNNEL:
You have a tool called 'submit_lead' that mirrors our Contact Form.
1. **Identify High-Intent**: If user asks about price, specific materials, or project starts.
2. **Gather Mandatory Info**: Name, Phone, Location (district/housing scheme), and Construction Status (New House or Renovation).
3. **Gently Ask**: "I'd love to help you with that. Could I get your name and a contact number to pass to our designers for a free measurement?"
4. **Soft Close**: Once you have Name, Phone, and 1 project detail, call 'submit_lead' immediately.

APPOINTMENT RESTRICTIONS: Showroom is CLOSED on Sundays and major 2026 holidays (CNY Feb 17-20, Hari Raya March 21-26). Suggest the next business day instead.

FEW-SHOT:
User: "How much for a kitchen in Rimba?"
Good response: "For a typical Rimba house, a durable plywood kitchen starts around BND 4,000-7,500. Since you're in Rimba, we can send a designer for a free measurement this week. Could I get your name and phone number to schedule that?
[SUGGEST]My name is [Name], phone is [Phone][/SUGGEST]
[SUGGEST]How long does it take?[/SUGGEST]
[SUGGEST]What finishes do you have?[/SUGGEST]"

BELOW IS THE CARAMELLA KNOWLEDGE BASE:
${ragKnowledge}

${body.learned_facts && body.learned_facts.length > 0 ? '\n\nFACTS LEARNED:\n- ' + body.learned_facts.join('\n- ') : ""}
`;

            if (!body.system_instruction) {
                body.system_instruction = {
                    parts: [{ text: personaPrompt }]
                };
            }

            // TOOL DEFINITION (Mirrors Contact Form)
            body.tools = [{
                function_declarations: [{
                    name: "submit_lead",
                    description: "Submits a project inquiry to the showroom team.",
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
                            summary: { type: "STRING" }
                        },
                        required: ["name", "phone"]
                    }
                }]
            }];

            const geminiBody = {
                contents: body.contents,
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
                if (data.candidates?.[0]?.content?.parts?.[0]?.functionCall) {
                    const call = data.candidates[0].content.parts[0].functionCall;
                    if (call.name === "submit_lead") {
                        try {
                            await fetch(FORMSPREE_URL, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    name: call.args.name,
                                    phone: call.args.phone,
                                    address: call.args.location || "Not provided",
                                    status: call.args.status || "Not specified",
                                    budget: call.args.budget || "Not provided",
                                    materials: call.args.materials || "Not specified",
                                    appointment_date: call.args.appointment_date || "Not provided",
                                    appointment_slot: call.args.appointment_slot || "Not provided",
                                    message: call.args.summary || "Lead captured via Chatbot Form-Sync Tool",
                                    source: "chatbot-form-sync"
                                }),
                            });
                        } catch (formErr) { console.error(formErr); }

                        const toolBody = {
                            contents: [
                                ...geminiBody.contents,
                                data.candidates[0].content,
                                {
                                    role: "user",
                                    parts: [{
                                        functionResponse: {
                                            name: "submit_lead",
                                            response: { content: "Lead successfully submitted." }
                                        }
                                    }]
                                }
                            ],
                            tools: geminiBody.tools,
                            system_instruction: geminiBody.system_instruction,
                            generationConfig: geminiBody.generationConfig
                        };

                        return await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(toolBody),
                        });
                    }
                }
                return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
            }

            return new Response(response.body, {
                status: response.status,
                headers: {
                    "Content-Type": "text/event-stream",
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                    "Access-Control-Allow-Origin": "*",
                },
            });

        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            });
        }
    },
};
