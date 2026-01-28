import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "/api" : "/api",
  withCredentials: true,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
