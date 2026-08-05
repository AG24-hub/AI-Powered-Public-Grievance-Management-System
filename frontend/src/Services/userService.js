import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "";
const API = `${API_URL}/api/user`;

// Login
export const loginUser = async (email, password) => {
  const res = await axios.post(`${API}/login`, { email, password });
  return res.data;
};

// Register
export const registerUser = async (name, email, password) => {
  const res = await axios.post(`${API}/register`, { name, email, password });
  return res.data;
};