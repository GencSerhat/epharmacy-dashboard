import axios from "axios";
//backend bağlantı
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
console.log("🔗 API BASE_URL:", BASE_URL);   // ⬅⬅ BUNU EKLE
const api = axios.create({
  baseURL: BASE_URL,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
