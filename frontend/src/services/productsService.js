// src/services/productsService.js
import api from "./api.js";

export async function fetchProducts(params = {}) {
  const { data } = await api.get("/products", {
    params: {
      name: params.name || undefined, // ürün adı filtresi
      page: params.page || 1,
      limit: params.limit || 20,
    },
  });

  console.log("Products API response:", data);
  return data;
}
// ✅ Yeni: ürün ekleme
export async function createProduct(payload) {
  const { data } = await api.post("/products", payload);
  console.log("Create product response:", data);
  return data;
}