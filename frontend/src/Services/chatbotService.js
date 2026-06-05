import axios from "axios";

export const sendMessageToBot = async (question) => {

    const response = await axios.post(
        "http://localhost:5000/api/chat",
        {
            question
        }
    );

    return response.data.answer;
};