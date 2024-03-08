import express from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";
import Tx from "../models/tx.model.js";
import Product from "../models/product.model.js";
import { STRIPE_PRIVATE_KEY, STRIPE_ENDPOINT_SECRET } from "../config.js";
import Shop from "../models/shop.model.js";

const router = express.Router();
const stripe = new Stripe(STRIPE_PRIVATE_KEY);

router.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const payload = req.body;
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        STRIPE_ENDPOINT_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items", "line_items.data.price.product"],
        }
      );

      const { line_items } = session;
      const items = line_items.data
        .map((item) => {
          return {
            productId: item.price.product.metadata.id,
            quantity: item.quantity,
            memo: item.price.product.metadata.memo,
            optionIds: JSON.parse(item.price.product.metadata.optionIds),
            price: item.amount_total / 100,
          };
        })
        .filter((item) => item.productId !== "-1");
      const price = items.reduce((prev, cur) => prev + cur.price, 0);

      for (const item of items) {
        const product = await Product.findById(item.productId);
        product.inventory = product.inventory - item.quantity;
        await product.save();
      }

      const tx = new Tx({
        shopName: session.metadata.shopName,
        customerIGName: session.metadata.customerIGName,
        items,
        price,
        email: session.customer_details.email,
        name: session.customer_details.name,
        memo: session.metadata.memo,
        datetime: session.metadata.datetime,
        status: 0,
        payment_intent: session.payment_intent,
        seatNum: session.metadata.seatNum,
        contactNum: session.metadata.contactNum,
        deliveryAddress: session.metadata.deliveryAddress,
        pickupAddress: session.metadata.pickupAddress,
      });
      await tx.save();

      res.status(200).end();
    }
  }
);
export default router;
