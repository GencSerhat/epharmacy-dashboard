import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //doğrulama
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    //Şifre kontrolü
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //Token oluştur
    const token = signToken(user._id.toString());

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    
    return res.json({ message: "Logged out succesfully" });
  } catch (error) {
    next(error);
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { _id, name, email, role } = req.user;

    return res.json({ id: _id, name, email, role });
  } catch (error) {
    next(error);
  }
};
