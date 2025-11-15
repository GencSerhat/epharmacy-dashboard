import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      // User Info - isim
      type: String,
      required: true,
      trim: true,
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    address: {
      // Address
      type: String,
      required: true,
      trim: true,
    },
    products: [
      {
        name: {
          // Products column (sade biçimde)
          type: String,
          required: true,
          trim: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    orderDate: {
      // Order date
      type: Date,
      default: Date.now,
    },
    totalPrice: {
      // Price column
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      // Status column
      type: String,
      enum: ["pending", "paid", "shipped", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
