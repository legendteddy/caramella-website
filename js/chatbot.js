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
    const WORKER_URL = "https://chat.caramellabrunei.com"; // Live Cloudflare backend routed through main domain

    // 2. INTERNAL OVERRIDE for pure local testing (Do not commit to public reps with a real key!) 
    // Ensure you use a restricted key if you ever accidentally expose it.
    const LOCAL_API_KEY = "";

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
    // System instructions & RAG knowledge are now injected securely via the Cloudflare Worker!
    let chatHistory = [];
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
        const escaped = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return escaped
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="text-decoration: underline;">$1</a>') // markdown links
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

        const messageText = chatInput.value.trim();
        chatInput.value = ''; // Clear input field

        // Handle Image Attachment (if any)
        const fileInput = document.getElementById('chat-image-upload');
        let attachedImageBase64 = null;
        let attachedMimeType = null;

        if (fileInput && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            attachedMimeType = file.type;
            attachedImageBase64 = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    // Extract base64 data only (remove data url prefix)
                    const base64String = reader.result.replace(/^data:image\/(png|jpeg|webp);base64,/, "");
                    resolve(base64String);
                };
                reader.readAsDataURL(file);
            });
            fileInput.value = ''; // clear input
        }

        if (!messageText && !attachedImageBase64) {
            sendBtn.disabled = true;
            return;
        }

        // --- Render User Message immediately ---
        const userMsgDiv = document.createElement('div');
        userMsgDiv.className = 'chat-message user-message';
        let userInnerHtml = formatUserMessage(messageText);

        if (attachedImageBase64) {
            userInnerHtml += `<br><img src="data:${attachedMimeType};base64,${attachedImageBase64}" style="max-width: 100%; border-radius: 4px; margin-top: 8px;">`;
        }
        userMsgDiv.innerHTML = userInnerHtml;
        chatBody.appendChild(userMsgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        sendBtn.disabled = true;

        // --- Setup new message part for Gemini API ---
        let userParts = [];
        if (messageText) {
            userParts.push({ text: messageText });
        }
        if (attachedImageBase64) {
            userParts.push({
                inlineData: {
                    mimeType: attachedMimeType,
                    data: attachedImageBase64
                }
            });
        }

        // --- Append to history ---
        chatHistory.push({
            role: "user",
            parts: userParts
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
