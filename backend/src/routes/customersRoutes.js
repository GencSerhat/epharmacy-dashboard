import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getCustomers,
  getCustomerById,
  updateCustomerById,
  createCustomer,
  deleteCustomerById,
} from "../controllers/customersController.js";

const router = express.Router();

// GET /api/customers  → Müşteri listesi (Customers Data sayfası için)
router.get("/", authMiddleware, getCustomers);

// GET /api/customers/:customerId  → Tek müşteri detayı + geçmiş (Dashboard modalı için)
router.get("/:customerId", authMiddleware, getCustomerById);

// POST /api/customers  → yeni müşteri
router.post("/", authMiddleware, createCustomer);

// PUT /api/customers/:customerId  → müşteri güncelle
router.put("/:customerId", authMiddleware, updateCustomerById);

// DELETE /api/customers/:customerId  → müşteri sil
router.delete("/:customerId", authMiddleware, deleteCustomerById);

export default router;
