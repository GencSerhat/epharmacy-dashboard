import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getSuppliers,createSupplier,updateSupplier,deleteSupplier } from "../controllers/suppliersController.js";

const router = express.Router();

//Get/api/suppliers
router.get("/", authMiddleware, getSuppliers);

// POST /api/suppliers
router.post("/", authMiddleware, createSupplier);

// PUT /api/suppliers/:supplierId
router.put("/:supplierId", authMiddleware, updateSupplier);

// DELETE /api/suppliers/:supplierId
router.delete("/:supplierId", authMiddleware, deleteSupplier);



export default router;
