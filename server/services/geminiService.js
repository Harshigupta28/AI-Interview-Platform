const { GoogleGenAI } = require("@google/genai");

let ai = null;

/**
 * Gets or initializes the Google GenAI client.
 * Ensures the API key is read dynamically at call-time.
 * 
 * @returns {GoogleGenAI} The Google GenAI client instance.
 */
const getClient = () => {
    if (!ai) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY environment variable is not defined");
        }
        ai = new GoogleGenAI({ apiKey });
    }
    return ai;
};

/**
 * Generates an interview question using the Google Gemini model.
 * 
 * @param {string} prompt - The prompt to send to the Gemini model.
 * @returns {Promise<string>} The generated text response.
 */
async function generateInterviewQuestion(prompt) {
    try {
        if (!prompt) {
            throw new Error("Prompt is required for generating interview question");
        }

        const client = getClient();

        // Call the Gemini model (gemini-2.5-flash)
        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        if (!response || !response.text) {
            throw new Error("Empty response or no text returned from Gemini API");
        }

        return response.text;
    } catch (error) {
        console.error("Error in geminiService.generateInterviewQuestion:", error.message || error);
        throw new Error(error.message || "Failed to generate interview question via Gemini API");
    }
}

module.exports = {
    generateInterviewQuestion,
};
