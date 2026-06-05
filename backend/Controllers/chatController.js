const axios = require("axios");

const chatbot = async (req, res) => {
    try {

        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question is required"
            });
        }

        const response = await axios.post(
            "http://127.0.0.1:8000/chat",
            {
                question
            }
        );

        return res.status(200).json({
            success: true,
            answer: response.data.answer
        });

    } catch (error) {

        console.error("Chatbot Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to get chatbot response"
        });
    }
};

module.exports = chatbot;