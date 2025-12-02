import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    // "Bearer <token>" formatı
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized: no token" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Not authorized: invalid token" });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized: user not found" });
    }

   
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
