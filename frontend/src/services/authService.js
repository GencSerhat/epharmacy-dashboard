import api from "./api.js";

export async function login(credentials) {

  const { data } = await api.post("/user/login", credentials);


  return data;
}
