import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getCustomers,
  getCustomerById,
} from "../controllers/customersController.js";

const router = express.Router();

// GET /api/customers  → Müşteri listesi (Customers Data sayfası için)
router.get("/", authMiddleware, getCustomers);

// GET /api/customers/:customerId  → Tek müşteri detayı + geçmiş (Dashboard modalı için)
router.get("/:customerId", authMiddleware, getCustomerById);

export default router;
