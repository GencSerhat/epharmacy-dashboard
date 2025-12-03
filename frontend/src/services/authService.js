import api from "./api.js";


// Register
export async function register(payload) {
  const { data } = await api.post("/user/register", payload);
  return data; // { token, user }
}

export async function login(credentials) {

  const { data } = await api.post("/user/login", credentials);


  return data;
}
