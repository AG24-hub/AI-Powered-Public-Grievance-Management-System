const axios = require("axios");
const fs = require("fs");
const path = require("path");

// ------------------------------------
// Load Knowledge Base at startup
// ------------------------------------

let knowledgeBase = "";
try {
    knowledgeBase = fs.readFileSync(
        path.join(__dirname, "..", "data", "knowledgeBase.txt"),
        "utf-8"
    );
    console.log(`Knowledge base loaded: ${knowledgeBase.length} characters`);
} catch (err) {
    console.error("Warning: Could not load knowledgeBase.txt:", err.message);
}

// ------------------------------------
// System Prompt
// ------------------------------------

const SYSTEM_PROMPT = `You are a helpful grievance assistant for a West Bengal Public Grievance Management System called Civic-AI.

Rules:
- Use ONLY the provided knowledge base context below to answer questions.
- Do not make up information.
- If the answer is not found in the context, respond exactly: "Please see the instruction given on the home page."
- Answer in a professional and friendly manner.
- Use bullet points when appropriate.
- Keep responses concise (2-3 lines).

=== KNOWLEDGE BASE ===
${knowledgeBase}
=== END KNOWLEDGE BASE ===`;

// ------------------------------------
// Format chat history for APIs
// ------------------------------------

function formatHistoryForGemini(history) {
    return history.map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
    }));
}

function formatHistoryForMistral(history) {
    return history.map(msg => ({
        role: msg.role,
        content: msg.content
    }));
}

// ------------------------------------
// Google Gemini API (Free Tier)
// 15 RPM, 1M tokens/min, 1500 RPD
// ------------------------------------

async function callGemini(question, history) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY not set");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const contents = [
        ...formatHistoryForGemini(history),
        { role: "user", parts: [{ text: question }] }
    ];

    const response = await axios.post(url, {
        system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
        },
        contents,
        generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 500
        }
    }, {
        headers: { "Content-Type": "application/json" },
        timeout: 30000
    });

    const candidate = response.data?.candidates?.[0];
    if (!candidate?.content?.parts?.[0]?.text) {
        throw new Error("Empty response from Gemini");
    }

    return candidate.content.parts[0].text;
}

// ------------------------------------
// Mistral API (Fallback)
// ------------------------------------

async function callMistral(question, history) {
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) throw new Error("MISTRAL_API_KEY not set");

    const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...formatHistoryForMistral(history),
        { role: "user", content: question }
    ];

    const response = await axios.post(
        "https://api.mistral.ai/v1/chat/completions",
        {
            model: "mistral-small-latest",
            messages,
            temperature: 0.2,
            max_tokens: 500
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            timeout: 30000
        }
    );

    const content = response.data?.choices?.[0]?.message?.content;
    if (!content) {
        throw new Error("Empty response from Mistral");
    }

    return content;
}

// ------------------------------------
// Main: Try Gemini first, fallback to Mistral
// ------------------------------------

async function getChatbotResponse(question, history = []) {
    // Try Gemini first (free tier, most generous)
    try {
        console.log("Trying Gemini API...");
        const answer = await callGemini(question, history);
        console.log("Gemini responded successfully");
        return answer;
    } catch (geminiError) {
        console.error("Gemini failed:", geminiError.message);
    }

    // Fallback to Mistral
    try {
        console.log("Trying Mistral API (fallback)...");
        const answer = await callMistral(question, history);
        console.log("Mistral responded successfully");
        return answer;
    } catch (mistralError) {
        console.error("Mistral failed:", mistralError.message);
    }

    // Both failed
    return "I'm sorry, the chatbot service is temporarily unavailable. Please try again later.";
}

module.exports = { getChatbotResponse };
