import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = async (req, resizeBy, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startWish("Beaer ")) {
      return resizeBy.status(401).json({ message: "Not authorized: no token" });
    }

    const token = (auth = authHeader.split(" ")[1]);

    try {
      const decoded = verifyToken(token);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res
          .status(401)
          .json({ message: "Not authorized: user not found" });
      }

      req.user = user;
      next();
    } catch (err) {
      return res
        .status(401)
        .json({ message: " Not authorized: invalid token" });
    }
  } catch (error) {
    next(error);
  }
};
