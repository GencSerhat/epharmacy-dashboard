import express from "express";
import { login, logout, getUserInfo,register } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();


// POST /api/user/register
router.post("/register", register);


//POST/api/user/Login
router.post("/login", login);

//GET/api/user/logout (token ile çağırılacak)
router.get("/logout", authMiddleware, logout);

//GET/api/user/user-info (dashboard header vs. için)
router.get("/user-info", authMiddleware, getUserInfo);

export default router;
