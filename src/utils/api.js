import axios from "axios";

// Local development me direct localhost:5000 backend use karo
const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const baseURL = isLocal
  ? "http://localhost:5000/api"
  : (import.meta.env.VITE_API_URL || "https://next-trend-backend.onrender.com/api");

const api = axios.create({
  baseURL,
  withCredentials: true, // cookies (login token) bhejne ke liye zaroori
});

// Bearer token support
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; 