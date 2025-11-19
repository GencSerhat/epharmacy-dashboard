import express from "express";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import { getProducts,createProduct,updateProduct,deleteProduct } from "../controllers/productsController.js";

const router = express.Router();

//Get/api/porducts
router.get("/", authMiddleware, getProducts);

// POST /api/products
router.post("/", authMiddleware, createProduct);

// PUT /api/products/:productId
router.put("/:productId", authMiddleware, updateProduct);

// DELETE /api/products/:productId
router.delete("/:productId", authMiddleware, deleteProduct);


export default router;
