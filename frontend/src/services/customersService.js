import api from "./api.js";


export async function fetchCustomers(params = {}) {
  const { data } = await api.get("/customers", {
    params: {
      name: params.name || undefined,
      page: params.page || 1,
      limit: params.limit || 10,
    },
  });

  console.log("Customers API response:", data);
  return data;
}


// Yeni müşteri oluştur
export async function createCustomer(payload) {
  const { data } = await api.post("/customers", payload);
  console.log("Create customer response:", data);

  return data.data || data;
}

//  Müşteri güncelle
export async function updateCustomer(id, payload) {
  const { data } = await api.put(`/customers/${id}`, payload);
  console.log("Update customer response:", data);
  return data.data || data;
}

//  Müşteri sil
export async function deleteCustomer(id) {
  const { data } = await api.delete(`/customers/${id}`);
  console.log("Delete customer response:", data);
  return data;
}