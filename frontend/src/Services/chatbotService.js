import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getToken = () => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo).token : null;
};

export const sendMessageToBot = async (question) => {
    const token = getToken()
    const response = await axios.post(
        `${API_URL}/api/chat`,
        { question },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.answer;
};