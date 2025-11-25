// src/services/dashboardService.js
import api from "./api.js";

export async function fetchDashboard() {
  const { data } = await api.get("/dashboard");
  // Backend'te ne dönüyorsak olduğu gibi geri veriyoruz
  return data;
}
