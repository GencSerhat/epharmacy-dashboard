// src/services/productsService.js
import api from "./api.js";

// ÜRÜNLERİ LİSTELE
export async function fetchProducts(params = {}) {
  const {
    search,
    name,
    page = 1,
    limit = 20,
  } = params;

  const { data } = await api.get("/products", {
    params: {
      // backend getProducts search paramı bekliyor
      search: search || name || undefined,
      page,
      limit,
    },
  });

  console.log("Products API response:", data);
  return data; // { data: [...], pagination: {...} }
}

// YENİ ÜRÜN EKLE
export async function createProduct(payload) {
  const { data } = await api.post("/products", payload);
  console.log("Create product response:", data);
  return data; // { data: newProduct }
}

// ÜRÜN GÜNCELLE (PUT /api/products/:productId)
export async function updateProduct(id, payload) {
  const { data } = await api.put(`/products/${id}`, payload);
  console.log("Update product response:", data);
  return data; // { message, data: updatedProduct }
}

// ÜRÜN SİL (DELETE /api/products/:productId)
export async function deleteProduct(id) {
  const { data } = await api.delete(`/products/${id}`);
  console.log("Delete product response:", data);
  return data; // { message, data: deletedProduct }
}
