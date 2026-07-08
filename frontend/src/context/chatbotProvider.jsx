import { createContext, useContext, useState } from "react";
import axios from "axios";
import { sendMessageToBot } from "../Services/chatbotService";

const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {

    const [messages, setMessages] = useState([
        {
            text: "Hello! How can I help you with Civic-AI today?",
            isBot: true
        }
    ]);

    const [loading, setLoading] = useState(false);

    const sendMessage = async (question) => {

        if (!question.trim()) return;

        setMessages(prev => [
            ...prev,
            {
                text: question,
                isBot: false
            }
        ]);

        setLoading(true);

        try {

            const response = await sendMessageToBot(question)

            setMessages(prev => [
                ...prev,
                {
                    text: response,
                    isBot: true
                }
            ]);

        } catch (error) {

            setMessages(prev => [
                ...prev,
                {
                    text: "Sorry, something went wrong.",
                    isBot: true
                }
            ]);

            console.error(error);

        } finally {
            setLoading(false);
        }
    };

    return (
        <ChatbotContext.Provider
            value={{
                messages,
                loading,
                sendMessage
            }}
        >
            {children}
        </ChatbotContext.Provider>
    );
};

export const useChatbot = () => {
    return useContext(ChatbotContext);
};

export default ChatbotContext;