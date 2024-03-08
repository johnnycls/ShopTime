import { Schema, model } from "mongoose";

const productSchema = new Schema({
  shop: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  images: { type: [String], default: [] },
  options: {
    type: [
      {
        options: [{ label: String, price: Number, isHidden: Boolean }],
        name: String,
        minSelect: Number,
        maxSelect: Number,
        isHidden: Boolean,
      },
    ],
    default: [],
  },
  description: {
    type: String,
    default: "",
  },
  categories: { type: [Schema.Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  priceAfterDiscount: { type: Number, default: -1 },
  status: { type: Number, default: 1 }, // 0 normal, 1 hidden, 2 deleted
  inventory: { type: Number, default: 0 },
});

const Product = model("Product", productSchema);

export default Product;
