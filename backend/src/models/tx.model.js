import { Schema, model } from "mongoose";

const txSchema = new Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    email: { type: String, default: "" },
    name: { type: String, default: "" },
    customerIGName: {
      type: String,
      required: true,
    },
    seatNum: { type: String, default: "" },
    contactNum: { type: String, default: "" },
    deliveryAddress: { type: String, default: "" },
    pickupAddress: { type: String, default: "" },
    items: [
      {
        productId: Schema.Types.ObjectId,
        quantity: Number,
        memo: String,
        optionIds: {
          type: Map,
          of: [Schema.Types.ObjectId],
          required: true,
        },
        price: { type: Number, required: true },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    memo: { type: String, default: "" },
    datetime: { type: Date, required: true },
    status: { type: Number, required: true }, // 0 paid, 1 approved, 2 finished, 3 cancelled
    payment_intent: { type: String, required: true },
  },
  { timestamps: true }
);

const Tx = model("Tx", txSchema);

export default Tx;
