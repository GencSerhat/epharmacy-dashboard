// src/services/authService.js
import api from "./api.js";

export async function login(credentials) {
  // credentials: { email, password }
  const { data } = await api.post("/user/login", credentials);

  // Backend'in döndüğü yapıyı buna göre uyarlarsın
  // Örn: { token, user }
  return data;
}
