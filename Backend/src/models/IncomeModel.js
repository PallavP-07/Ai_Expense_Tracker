import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true,
    },
    file: {
      filename: { type: String },
      originalname: { type: String },
      path: { type: String },
      mimetype: { type: String },
      size: { type: Number },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Income", IncomeSchema);
