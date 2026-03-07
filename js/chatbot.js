/**
 * Caramella Chatbot — Premium AI Consultant
 * 
 * Features:
 * - Streaming SSE responses (real-time word-by-word rendering)
 * - Suggested follow-up chips
 * - Smart time-aware greeting
 * - Conversation export
 * - Enhanced structured memory (localStorage)
 * - Image upload (vision)
 * - Multilingual auto-detect
 * 
 * Architecture: BFF proxy via Cloudflare Worker → Gemini API
 */

document.addEventListener("DOMContentLoaded", () => {
    // --- CONFIGURATION ---
    const WORKER_URL = "https://chat.caramellabrunei.com";
    const LOCAL_API_KEY = "";
    const DANGEROUS_LOCAL_TESTING = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && LOCAL_API_KEY;

    // --- DOM Elements ---
    const chatContainer = document.getElementById('caramella-chatbot');
    const toggleBtn = document.getElementById('chatbot-toggle-btn');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const chatBody = document.getElementById('chatbot-body');
    const chatForm = document.getElementById('chatbot-form');
    const chatInput = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send-btn');

    // --- State ---
    let chatHistory = [];
    let isStreaming = false;

    // ============================
    // SMART GREETING
    // ============================
    const initSmartGreeting = () => {
        const hour = new Date().getHours();
        let greeting;
        if (hour < 12) greeting = "Good morning";
        else if (hour < 17) greeting = "Good afternoon";
        else greeting = "Good evening";

        // Check if returning user (inline read — getMemory not yet defined at this point)
        let userName = null;
        try {
            const raw = localStorage.getItem('caramella_learned_facts');
            if (raw) {
                const facts = JSON.parse(raw);
                if (Array.isArray(facts)) {
                    userName = facts.find(m => {
                        const f = typeof m === 'string' ? m : m.fact;
                        return f && f.toLowerCase().includes('name');
                    });
                    if (userName && typeof userName !== 'string') userName = { fact: userName.fact };
                    else if (typeof userName === 'string') userName = { fact: userName };
                }
            }
        } catch (e) { /* no memory */ }

        const welcomeDiv = chatBody.querySelector('.bot-message');
        if (welcomeDiv) {
            if (userName) {
                const name = userName.fact.replace(/user'?s?\s*name\s*(is|:)\s*/i, '').trim();
                welcomeDiv.innerHTML = `${greeting}, <strong>${name}</strong>. Welcome back to Caramella. How can I help you today?`;
            } else {
                welcomeDiv.innerHTML = `${greeting}. I'm your Caramella design consultant — here to help with kitchens, wardrobes, or any questions about custom cabinetry in Brunei. What are you working on?`;
            }
        }
    };

    initSmartGreeting();

    // ============================
    // TOGGLE LOGIC
    // ============================
    const toggleChat = () => {
        const isClosed = chatContainer.classList.contains('closed');
        if (isClosed) {
            chatContainer.classList.remove('closed');
            chatContainer.setAttribute('aria-hidden', 'false');
            toggleBtn.style.opacity = '0';
            toggleBtn.style.pointerEvents = 'none';
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

    toggleBtn.addEventListener('click', () => {
        const welcomeBubble = document.getElementById('chatbot-welcome-bubble');
        if (welcomeBubble) welcomeBubble.style.display = 'none';
        toggleChat();
    });
    closeBtn.addEventListener('click', toggleChat);

    // Welcome bubble: show after 5s for first-time visitors
    const welcomeBubble = document.getElementById('chatbot-welcome-bubble');
    if (welcomeBubble && !localStorage.getItem('chatWelcomeDismissed')) {
        setTimeout(() => {
            if (chatContainer.classList.contains('closed')) {
                welcomeBubble.style.display = 'block';
            }
        }, 5000);
    }

    // ============================
    // INPUT STATE
    // ============================
    chatInput.addEventListener('input', () => {
        sendBtn.disabled = chatInput.value.trim().length === 0;
    });

    // ============================
    // FORMATTING HELPERS
    // ============================
    const formatBotMessage = (text) => {
        const escaped = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return escaped
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="text-decoration: underline;">$1</a>')
            .replace(/\n\n/g, "<br><br>")
            .replace(/\n/g, "<br>");
    };

    const formatUserMessage = (text) => {
        return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };

    // ============================
    // CHAT RENDERING
    // ============================
    const appendMessage = (text, sender) => {
        const div = document.createElement('div');
        div.className = `chat-message ${sender}-message`;
        div.innerHTML = sender === 'bot' ? formatBotMessage(text) : formatUserMessage(text);
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
        return div;
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

    // ============================
    // SUGGESTION CHIPS
    // ============================
    const renderSuggestionChips = (suggestions) => {
        // Remove any existing chips
        const existing = chatBody.querySelector('.suggestion-chips');
        if (existing) existing.remove();

        if (!suggestions || suggestions.length === 0) return;

        const container = document.createElement('div');
        container.className = 'suggestion-chips';

        suggestions.forEach(text => {
            const chip = document.createElement('button');
            chip.className = 'suggestion-chip';
            chip.textContent = text;
            chip.addEventListener('click', () => {
                // Remove chips when clicked
                container.remove();
                // Set input value and submit
                chatInput.value = text;
                sendBtn.disabled = false;
                chatForm.dispatchEvent(new Event('submit', { cancelable: true }));
            });
            container.appendChild(chip);
        });

        chatBody.appendChild(container);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    // ============================
    // MEMORY SYSTEM (Enhanced)
    // ============================
    const MEMORY_KEY = 'caramella_learned_facts';
    const MAX_MEMORIES = 50;


    const getMemory = () => {
        try {
            const raw = localStorage.getItem(MEMORY_KEY);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            // Support both old format (string[]) and new format (object[])
            if (Array.isArray(parsed) && parsed.length > 0) {
                if (typeof parsed[0] === 'string') {
                    // Migrate old format
                    return parsed.map(fact => ({ fact, ts: Date.now() }));
                }
                return parsed;
            }
            return [];
        } catch (e) { return []; }
    };

    const saveMemory = (memories) => {
        // Keep only the most recent MAX_MEMORIES
        const trimmed = memories.slice(-MAX_MEMORIES);
        localStorage.setItem(MEMORY_KEY, JSON.stringify(trimmed));
    };

    const getMemoryStrings = () => {
        return getMemory().map(m => typeof m === 'string' ? m : m.fact);
    };

    // ============================
    // CONVERSATION EXPORT
    // ============================
    const exportConversation = () => {
        const messages = chatBody.querySelectorAll('.chat-message');
        let text = "=== Caramella Design Consultation ===\n";
        text += `Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}\n`;
        text += `Time: ${new Date().toLocaleTimeString('en-GB')}\n`;
        text += "=====================================\n\n";

        messages.forEach(msg => {
            const sender = msg.classList.contains('user-message') ? 'You' : 'Caramella AI';
            const content = msg.textContent.trim();
            text += `[${sender}]\n${content}\n\n`;
        });

        text += "=====================================\n";
        text += "Caramella Trading Co. | caramellabrunei.com\n";
        text += "WhatsApp: +673 718 7185\n";

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `caramella-consultation-${new Date().toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Attach export button if it exists
    const exportBtn = document.getElementById('chatbot-export-btn');
    if (exportBtn) exportBtn.addEventListener('click', exportConversation);

    // ============================
    // STREAMING SSE PARSER
    // ============================
    const parseSSEStream = async (response, onChunk, onDone) => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let fullText = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop(); // Keep incomplete line in buffer

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6).trim();
                    if (data === '[DONE]') continue;
                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.candidates && parsed.candidates[0]) {
                            const parts = parsed.candidates[0].content?.parts;
                            if (parts) {
                                for (const part of parts) {
                                    // Skip thinking/thought parts — only show final answer
                                    if (part.thought) continue;
                                    if (part.text) {
                                        fullText += part.text;
                                        onChunk(fullText);
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        // Skip unparseable chunks
                    }
                }
            }
        }
        onDone(fullText);
    };

    // ============================
    // PROCESS BOT RESPONSE (extract memory + suggestions)
    // ============================
    const processResponse = (botText) => {
        let cleanText = botText;
        let suggestions = [];

        // Extract [SUGGEST] tags
        const suggestRegex = /\[SUGGEST\]([\s\S]*?)\[\/SUGGEST\]/g;
        let match;
        while ((match = suggestRegex.exec(botText)) !== null) {
            suggestions.push(match[1].trim());
        }
        cleanText = cleanText.replace(/\[SUGGEST\][\s\S]*?\[\/SUGGEST\]/g, '').trim();

        // Extract [LEARN] tags
        const learnRegex = /\[LEARN\]([\s\S]*?)\[\/LEARN\]/g;
        const memories = getMemory();
        let newFacts = false;
        while ((match = learnRegex.exec(botText)) !== null) {
            try {
                const factStr = match[1].trim();
                if (factStr.startsWith('{') && factStr.endsWith('}')) {
                    const factObj = JSON.parse(factStr);
                    if (factObj.fact && !memories.some(m => m.fact === factObj.fact)) {
                        memories.push({ fact: factObj.fact, ts: Date.now() });
                        newFacts = true;
                    }
                }
            } catch (e) {
                console.error("Failed to parse memory:", e);
            }
        }
        if (newFacts) saveMemory(memories);
        cleanText = cleanText.replace(/\[LEARN\][\s\S]*?\[\/LEARN\]/g, '').trim();

        return { cleanText, suggestions };
    };

    // ============================
    // FORM SUBMIT HANDLER
    // ============================
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (isStreaming) return;

        const messageText = chatInput.value.trim();
        chatInput.value = '';

        // Handle Image Attachment
        const fileInput = document.getElementById('chat-image-upload');
        let attachedImageBase64 = null;
        let attachedMimeType = null;

        if (fileInput && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            attachedMimeType = file.type;
            attachedImageBase64 = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result.replace(/^data:image\/(png|jpeg|webp);base64,/, "");
                    resolve(base64String);
                };
                reader.readAsDataURL(file);
            });
            fileInput.value = '';
        }

        if (!messageText && !attachedImageBase64) {
            sendBtn.disabled = true;
            return;
        }

        // Remove existing suggestion chips
        const existingChips = chatBody.querySelector('.suggestion-chips');
        if (existingChips) existingChips.remove();

        // Render user message
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
        isStreaming = true;

        // Build user parts
        let userParts = [];
        if (messageText) userParts.push({ text: messageText });
        if (attachedImageBase64) {
            userParts.push({
                inlineData: { mimeType: attachedMimeType, data: attachedImageBase64 }
            });
        }

        chatHistory.push({ role: "user", parts: userParts });

        // Show typing
        showTyping();

        // Prepare payload
        const storedMemories = getMemoryStrings();
        const payload = {
            contents: chatHistory,
            learned_facts: storedMemories
        };

        try {
            let response;

            if (DANGEROUS_LOCAL_TESTING) {
                // Local testing: non-streaming fallback
                const model = "gemini-3.1-flash-lite-preview";
                const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${LOCAL_API_KEY}`;
                const payloadLocal = { ...payload };
                delete payloadLocal.learned_facts;

                response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payloadLocal)
                });

                const responseData = await response.json();
                removeTyping();

                let botText = "I'm sorry, I couldn't generate a response.";
                if (responseData.candidates && responseData.candidates.length > 0) {
                    const parts = responseData.candidates[0].content.parts;
                    if (parts && parts.length > 0) botText = parts[0].text;
                }

                const { cleanText, suggestions } = processResponse(botText);
                chatHistory.push({ role: "model", parts: [{ text: cleanText }] });
                appendMessage(cleanText, 'bot');
                renderSuggestionChips(suggestions);

            } else {
                // Production: try streaming first, fallback to non-streaming
                const streamingSuccess = await (async () => {
                    try {
                        response = await fetch(WORKER_URL, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });

                        if (!response.ok) throw new Error(`Server returned ${response.status}`);
                        // Verify we got an SSE stream
                        const contentType = response.headers.get('content-type') || '';
                        if (!contentType.includes('text/event-stream')) throw new Error('Not SSE');

                        removeTyping();
                        const botDiv = document.createElement('div');
                        botDiv.className = 'chat-message bot-message streaming';
                        chatBody.appendChild(botDiv);

                        await parseSSEStream(
                            response,
                            (accumulated) => {
                                // Direct real-time update without word-by-word delays
                                const displayOnly = accumulated
                                    .replace(/\[SUGGEST\][\s\S]*?\[\/SUGGEST\]/g, '')
                                    .replace(/\[LEARN\][\s\S]*?\[\/LEARN\]/g, '')
                                    .trim();
                                
                                requestAnimationFrame(() => {
                                    botDiv.innerHTML = formatBotMessage(displayOnly);
                                    chatBody.style.scrollBehavior = 'auto';
                                    chatBody.scrollTop = chatBody.scrollHeight;
                                });
                            },
                            (finalText) => {
                                const finalize = () => {
                                    const { cleanText, suggestions } = processResponse(finalText);
                                    botDiv.innerHTML = formatBotMessage(cleanText);
                                    botDiv.classList.remove('streaming');
                                    chatHistory.push({ role: "model", parts: [{ text: cleanText }] });
                                    
                                    setTimeout(() => {
                                        renderSuggestionChips(suggestions);
                                        chatBody.style.scrollBehavior = 'smooth';
                                        chatBody.scrollTop = chatBody.scrollHeight;
                                    }, 100);
                                };
                                finalize();
                            }
                        );
                        return true;
                    } catch (streamErr) {
                        console.warn("Streaming failed, falling back to non-streaming:", streamErr.message);
                        return false;
                    }
                })();

                // Fallback: non-streaming request
                if (!streamingSuccess) {
                    try {
                        response = await fetch(WORKER_URL + '?stream=false', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });
                        const data = await response.json();
                        removeTyping();

                        let botText = "I'm sorry, I couldn't generate a response.";
                        if (data.candidates && data.candidates.length > 0) {
                            // Filter out thought parts
                            const textParts = (data.candidates[0].content?.parts || []).filter(p => !p.thought && p.text);
                            if (textParts.length > 0) botText = textParts.map(p => p.text).join('');
                        }
                        const { cleanText, suggestions } = processResponse(botText);
                        chatHistory.push({ role: "model", parts: [{ text: cleanText }] });
                        appendMessage(cleanText, 'bot');
                        renderSuggestionChips(suggestions);
                    } catch (fallbackErr) {
                        console.error("Fallback also failed:", fallbackErr);
                        removeTyping();
                        throw fallbackErr;
                    }
                }
            }
        } catch (error) {
            console.error("Chat Error:", error);
            removeTyping();
            appendMessage("⚠️ I'm currently disconnected. Please check the backend configuration or contact us directly on WhatsApp.", 'bot');
            const targetDiv = chatBody.lastElementChild;
            targetDiv.classList.add('error-message');
        } finally {
            isStreaming = false;
            sendBtn.disabled = chatInput.value.trim().length === 0;
        }
    });
});
