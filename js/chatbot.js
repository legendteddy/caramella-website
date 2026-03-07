/**
 * Caramella Chatbot Integration
 * 
 * Secure BFF (Backend-for-Frontend) architecture.
 * This script communicates with a Cloudflare Worker proxy to protect the Gemini API key.
 * 
 * NOTE TO DEV: For local testing *strictly*, you can uncomment LOCAL_API_KEY.
 * NEVER push a real API key to GitHub.
 */

document.addEventListener("DOMContentLoaded", () => {
    // --- CONFIGURATION ---

    // 1. PRODUCTION setting (Cloudflare URL)
    const WORKER_URL = "https://gemini-chat-proxy.caramellabrunei.workers.dev"; // Live Cloudflare backend

    // 2. INTERNAL OVERRIDE for pure local testing (Do not commit to public reps with a real key!) 
    // Ensure you use a restricted key if you ever accidentally expose it.
    const LOCAL_API_KEY = "YOUR_API_KEY_HERE";

    // ---------------------

    const DANGEROUS_LOCAL_TESTING = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && LOCAL_API_KEY;

    // DOM Elements
    const chatContainer = document.getElementById('caramella-chatbot');
    const toggleBtn = document.getElementById('chatbot-toggle-btn');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const chatBody = document.getElementById('chatbot-body');
    const chatForm = document.getElementById('chatbot-form');
    const chatInput = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send-btn');

    // Chat History context
    let chatHistory = [
        {
            "role": "user",
            "parts": [{
                "text": `You are the Design Consultant for Caramella Trading Co. (Brunei’s leading custom cabinetry authority since 2015). Your goal is to provide expert guidance and politely encourage consultations.

TONE: Professional, authoritative, premium, and helpful. Use concise, high-impact language. Do not act like a pushy salesman.

KEY KNOWLEDGE:
1. CLIMATE: Standard cabinets fail in Brunei’s 80-90% humidity. Caramella uses 18mm ENF solid plywood ( formaldehyde-safe) and 190°C EVA edge sealing—engineered to never swell or peel. 
2. QUALITY: Built with CNC machinery to 0.1mm precision.
3. PRICING: I-shape medians ~BND 5.8k, L-shape ~BND 9.5k, U-shape ~BND 13.5k. 
4. LOCATION: Unit 22, Airport Mall showroom. BSB.

SALES LOGIC:
- If asked about kitchens/wardrobes, ask for layout or dimensions, then provide median price ranges.
- Highlight the "Hidden Costs" of Miri/China imports (Transport, Customs, No Warranty).
- ALWAYS conclude by helpfully offering a WhatsApp consultation at +673 718 7185 or a Showroom visit.`
            }]
        },
        {
            "role": "model",
            "parts": [{ "text": "Understood. I am now acting as the Caramella Design Consultant. I will focus on our technical superiority (ENF plywood, humidity engineering, 0.1mm CNC precision) and helpfully guide conversations toward a WhatsApp consultation or Showroom visit without being overly salesy." }]
        }
    ];

    // Toggle logic
    const toggleChat = () => {
        const isClosed = chatContainer.classList.contains('closed');
        if (isClosed) {
            chatContainer.classList.remove('closed');
            chatContainer.setAttribute('aria-hidden', 'false');
            toggleBtn.style.opacity = '0';
            toggleBtn.style.pointerEvents = 'none';
            // Scroll to bottom
            setTimeout(() => {
                chatBody.scrollTop = chatBody.scrollHeight;
                chatInput.focus();
            }, 300);
        } else {
            chatContainer.classList.add('closed');
            chatContainer.setAttribute('aria-hidden', 'true');
            toggleBtn.style.opacity = '1';
            toggleBtn.style.pointerEvents = 'auto';
        }
    };

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // Input state
    chatInput.addEventListener('input', () => {
        sendBtn.disabled = chatInput.value.trim().length === 0;
    });

    // Formatting Helpers
    const formatBotMessage = (text) => {
        // Convert basic markdown to HTML safely
        const escaped = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return escaped
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold
            .replace(/\n\n/g, "<br><br>") // paragraphs
            .replace(/\n/g, "<br>"); // lines
    };

    const formatUserMessage = (text) => {
        return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };

    // Chat Rendering
    const appendMessage = (text, sender) => {
        const div = document.createElement('div');
        div.className = `chat-message ${sender}-message`;
        div.innerHTML = sender === 'bot' ? formatBotMessage(text) : formatUserMessage(text);
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const showTyping = () => {
        const div = document.createElement('div');
        div.className = 'typing-indicator';
        div.id = 'typing-indicator';
        div.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const removeTyping = () => {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    };

    // Handle Form Submit
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const message = chatInput.value.trim();
        if (!message) return;

        // 1. Display User Message
        appendMessage(message, 'user');
        chatInput.value = '';
        sendBtn.disabled = true;

        // Add to local history context
        chatHistory.push({
            "role": "user",
            "parts": [{ "text": message }]
        });

        // 2. Show typing indicator
        showTyping();

        // 3. Prepare Payload
        const payload = {
            contents: chatHistory
        };

        try {
            let response;
            let responseData;

            // Branch logic depending on local vs cloudflare
            if (DANGEROUS_LOCAL_TESTING) {
                // Direct to Google API (LOCAL ONLY)
                const model = "gemini-3.1-flash-lite-preview"; // Using the latest 3.1 preview
                const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${LOCAL_API_KEY}`;

                response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            } else {
                // Production: proxy via Cloudflare worker
                if (WORKER_URL === "https://your-cloudflare-worker-url.workers.dev") {
                    throw new Error("Cloudflare worker URL is not configured. (Developer mode check URL constant).");
                }
                response = await fetch(WORKER_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            }

            if (!response.ok) {
                // Handle different errors
                let errorText = await response.text();
                console.error("API Error Details:", errorText);
                throw new Error(`Server returned ${response.status}`);
            }

            responseData = await response.json();

            // Extract the generated text from Gemini payload struct
            let botText = "I'm sorry, I couldn't generate a response.";
            if (responseData.candidates && responseData.candidates.length > 0) {
                const parts = responseData.candidates[0].content.parts;
                if (parts && parts.length > 0) {
                    botText = parts[0].text;
                }
            }

            // Save to context history
            chatHistory.push({
                "role": "model",
                "parts": [{ "text": botText }]
            });

            removeTyping();
            appendMessage(botText, 'bot');

        } catch (error) {
            console.error("Chat Error:", error);
            removeTyping();
            appendMessage("⚠️ I'm currently disconnected. Please check the backend configuration or contact us directly on WhatsApp.", 'bot');
            const targetDiv = chatBody.lastElementChild;
            targetDiv.classList.add('error-message');
        }
    });

});
