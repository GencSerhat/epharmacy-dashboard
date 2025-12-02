import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    title: {
     
      type: String,
      required: true,
      trim: true,
    },
    email: {
      
      type: String,
      trim: true,
      lowercase: true,
    },
    amount: {
     
      type: Number,
      required: true,
      min: 0,
    },
    type: {
    
      type: String,
      enum: ["income", "expense", "error"],
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
