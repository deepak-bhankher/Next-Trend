import axios from "axios";

const api = axios.create({
  baseURL: "https://next-trend-backend.onrender.com/api",
  withCredentials: true, // cookies (login token) bhejne ke liye zaroori
});

export default api; 