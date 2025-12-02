import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: {
     
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
      
      type: String,
      required: true,
      trim: true,
    },
    products: [
      {
        name: {
          
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
    
      type: Date,
      default: Date.now,
    },
    totalPrice: {
     
      type: Number,
      required: true,
      min: 0,
    },
    status: {
     
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
