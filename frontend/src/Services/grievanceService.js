import axios from "axios";

const API = "/api/grievances"

//as I have saved everything under userInfo in my log in function I will first fetch it
const userInfo = localStorage.getItem("userInfo")
//console.log("Raw userInfo from storage:", userInfo);

//extract userinfo from it
const token = userInfo ? JSON.parse(userInfo).token : null
//console.log("Token being sent:", token);



//User: create grievance
export const createGrievances = async(district, address, pincode, priority, contactNum, complaintTitle, complaintDetails, supportingDocs)=> {
    const res = await axios.post(`${API}/`, {district, address, pincode, priority, contactNum, complaintTitle, complaintDetails, supportingDocs})
    return res.data
}

//User: see my grievances
export const seeMyGrievances = async()=> {
    const res = await axios.get(`${API}/my`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}

//Shared: see stats
export const seeAllStats = async()=> {
    const res = await axios.get(`${API}/stats`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}

//Admin: see all grievances
export const seeAllGrievances = async()=> {
    const res = await axios.get(`${API}/all`)
    return res.data
}

//Admin: updating the status of grievances
export const updateStatus = async(id, status)=> {
    const res = await axios.put(`${API}/status/${id}`, status)
    return res.data
}

//User: update grievances
export const update = async(id, data)=> {
    const res = await axios.put(`${API}/${id}`, data)
    return res.data
}

//User: track grievances
export const track = async(id)=> {
    const res = await axios.get(`${API}/${id}`)
    return res.data
}

//User: delete grievances
export const deleteG = async(id)=> {
    const res = await axios.delete(`${API}/${id}`)
    return res.data
}