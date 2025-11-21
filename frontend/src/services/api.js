import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: BASE_URL,
});

//Her isteğe LOCALStorage'daki tokenı ekle
api.interceptors.request.use((config)=>{
    const token= localStorage.getItem("accessToken");

    if(token) {
        config.headers.Authorization=`Bear ${token}`;
    }
    return config;
});
export default api;