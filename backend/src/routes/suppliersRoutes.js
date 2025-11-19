import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getSuppliers } from "../controllers/suppliersController.js";

const router = express.Router();

//Get/api/suppliers
router.get("/", authMiddleware, getSuppliers);

export default router;
