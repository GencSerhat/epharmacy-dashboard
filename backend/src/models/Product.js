import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Medicine",
        "Head",
        "Hand",
        "Dental Care",
        "Skin Care",
        "Eye Care",
        "Vitamins & Supplements",
        "Orthopedic Products",
        "Baby Care",
      ],
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    suppliers: {
      type: [String], // basit tutuyoruz: isim listesi
      default: [],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
