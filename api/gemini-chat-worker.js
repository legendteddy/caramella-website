/**
 * Caramella Chatbot - Cloudflare Worker Proxy
 * 
 * This script runs securely on Cloudflare's Edge (Serverless).
 * It listens for requests from the Caramella Website, injects the secret API key,
 * and calls the Google Gemini API.
 * 
 * How to deploy:
 * 1. Log in to Cloudflare -> Workers & Pages
 * 2. Click "Create Worker"
 * 3. Name it "gemini-chat-proxy"
 * 4. Paste this code into the editor
 * 5. Add your API Key securely in Cloudflare Settings: "Settings" -> "Variables" -> "Environment Variables" -> Add Secret "GEMINI_API_KEY"
 * 6. Click Deploy.
 * 7. Update `WORKER_URL` in your website's `js/chatbot.js` with the provided Cloudflare URL.
 */

// NOTE: You can also hardcode the model name here safely
const GEMINI_MODEL = "gemini-1.5-flash"; // Currently the most stable cost-effective model, or upgrade to "gemini-2.5-flash-lite" if explicitly tested.

export default {
    async fetch(request, env, ctx) {
        // 1. Handle CORS Preflight (OPTIONS request) setup for static website cross-origin
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*", // Or restrict to "https://caramellabrunei.com"
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
            });
        }

        // Only allow POST requests
        if (request.method !== "POST") {
            return new Response("Method not allowed", { status: 405 });
        }

        try {
            // Retrieve the API Key from Environment Variables
            const apiKey = env.GEMINI_API_KEY;
            if (!apiKey) {
                return new Response(JSON.stringify({ error: "API Key not configured in Worker Environment" }), {
                    status: 500,
                    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
                });
            }

            // Parse the incoming JSON body from our frontend
            const body = await request.json();

            // Prepare the fetch path to Gemini API
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

            // Make the request to Google
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const responseData = await response.json();

            // Forward the exact Gemini payload back downstream
            return new Response(JSON.stringify(responseData), {
                status: response.status,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });

        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
        }
    },
};
