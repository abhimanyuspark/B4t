import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
  withCredentials: true,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    // normal 401 refresh logic...
  },
);

export default api;
