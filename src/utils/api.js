import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // cookies (login token) bhejne ke liye zaroori
});

export default api;