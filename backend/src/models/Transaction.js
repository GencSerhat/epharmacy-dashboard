import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    title: {
      // Başlık
      type: String,
      required: true,
      trim: true,
    },
    email: {
      // Müşteri işlemi ise e-posta, değilse boş bırakılabilir
      type: String,
      trim: true,
      lowercase: true,
    },
    amount: {
      // Tutar
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      // income / expense / error
      type: String,
      enum: ["income", "expense", "error"],
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
