// src/services/suppliersService.js
import api from "./api.js";

// Tüm tedarikçileri getir
export async function fetchSuppliers(params = {}) {
  const { data } = await api.get("/suppliers", {
    params: {
      name: params.name || undefined,
      page: params.page || 1,
      limit: params.limit || 20,
    },
  });

  console.log("Suppliers API response:", data);
  return data; // { data: [...], pagination: {...} }
}

// Yeni tedarikçi oluştur
export async function createSupplier(payload) {
  const { data } = await api.post("/suppliers", payload);
  console.log("Create supplier response:", data);
  return data;
}

// Mevcut tedarikçiyi güncelle
export async function updateSupplier(supplierId, payload) {
  const { data } = await api.put(`/suppliers/${supplierId}`, payload);
  console.log("Update supplier response:", data);
  return data;
}
