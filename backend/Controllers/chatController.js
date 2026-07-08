const axios = require("axios");
const Chat = require("../Models/chatModel");

const chatbot = async (req, res) => {
    try {

        const { question } = req.body;

        //find user chat history
        let chat = await Chat.findOne({user: req.user._id})

        if(!chat){
            chat = await Chat.create({
                user: req.user._id,
                messages: []
            })
        }

        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question is required"
            });
        }

        const history = chat.messages.slice(-10)
        const response = await axios.post(
            "http://127.0.0.1:8000/chat",
            {
                question, history
            }
        );

        chat.messages.push({
            role: "user", content: question
        })

        chat.messages.push({
            role: "assistant", content: response.data.answer
        })

        await chat.save()

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