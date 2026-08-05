import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "";
const API = `${API_URL}/api/grievances`;

//as I have saved everything under userInfo in my log in function I will first fetch it
const getToken = () => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo).token : null;
};

//User: create grievance
export const createGrievances = async(formData)=> {
    const token = getToken();
    const res = await axios.post(`${API}/`, formData, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}

//User: see my grievances
export const seeMyGrievances = async()=> {
    const token = getToken();
    const res = await axios.get(`${API}/my`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}

//Shared: see stats
export const seeAllStats = async()=> {
    const token = getToken();
    const res = await axios.get(`${API}/stats`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}

//Admin: see all grievances
export const seeAllGrievances = async(page = 1, limit = 10)=> {
    const token = getToken();
    const res = await axios.get(`${API}/all?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}

//Admin: updating the status of grievances
export const updateStatus = async(id, status)=> {
    const token = getToken();
    const res = await axios.put(`${API}/status/${id}`, {status}, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}

//User: update grievances
export const update = async(id, data)=> {
    const token = getToken();
    const res = await axios.put(`${API}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}

//User: delete grievances
export const deleteG = async(id)=> {
    const token = getToken();
    const res = await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}