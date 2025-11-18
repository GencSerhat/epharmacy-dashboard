import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getOrders,createOrder,getOrderById,updateOrderStatus,deleteOrder } from "../controllers/ordersController.js";

const router = express.Router();

// GET /api/orders
// Bu rota sadece giriş yapmış kullanıcılar tarafından görülebilir.
router.get("/", authMiddleware, getOrders);

// POST /api/orders
router.post("/", authMiddleware, createOrder);

// GET /api/orders/:id
router.get("/:id", authMiddleware, getOrderById);

// PATCH /api/orders/:id/status
router.patch("/:id/status", authMiddleware, updateOrderStatus);

// DELETE /api/orders/:id
router.delete("/:id", authMiddleware, deleteOrder);



export default router;
