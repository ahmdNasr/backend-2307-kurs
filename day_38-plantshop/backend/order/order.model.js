import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: { type: String, required: true },
        productTitle: {type: String, required: true},
        productImg: { type: String },
        productPrice: { type: Number, required: true},
        amount: {type: Number, required: true}
      },
    ],
    // comments: {type: String},
    priceTotal: { type: Number, required: true },
  },
  { collection: "orders", timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);