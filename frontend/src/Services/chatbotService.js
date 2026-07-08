import axios from "axios";

const getToken = () => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo).token : null;
};

export const sendMessageToBot = async (question) => {
    const token = getToken()

    const response = await axios.post(
        "http://localhost:5000/api/chat",
        {
            question
        },{
            headers: { Authorization: `Bearer ${token}` }
        }
    );

    return response.data.answer;
};