// src/services/ordersService.js
import api from "./api.js";

export async function fetchOrders(params = {}) {
  const { data } = await api.get("/orders", {
    params: {
      // backend büyük ihtimalle name query paramını bekliyor
      name: params.name || undefined,
      page: params.page || 1,
      limit: params.limit || 10,
    },
  });

  console.log("Orders API response:", data);
  return data;
}
