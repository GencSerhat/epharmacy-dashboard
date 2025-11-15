import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      // User Info
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      // Dashboard "recent customers" tablosu için
      type: String,
      trim: true,
    },
    registerDate: {
      // Customers tablosundaki "Register date"
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
