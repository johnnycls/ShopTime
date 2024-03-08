import express from "express";
import Stripe from "stripe";
import auth from "../middlewares/auth.js";
import Tx from "../models/tx.model.js";
import Shop from "../models/shop.model.js";
import Product from "../models/product.model.js";
import { STRIPE_PRIVATE_KEY, FRONTEND_URL, MIN_CHARGE } from "../config.js";

const router = express.Router();
const stripe = new Stripe(STRIPE_PRIVATE_KEY);

router.get("/", auth, async (req, res, next) => {
  const shopName = res.locals.shop;
  const shop = await Shop.findOne({ shopName });
  const { minPrice, maxPrice, minDateTime, maxDateTime, statuses, key } =
    req.query;

  const conditions = { shopName };
  if (minPrice !== undefined && maxPrice !== undefined)
    conditions.price = { $gte: minPrice, $lte: maxPrice };
  else if (minPrice !== undefined) conditions.price = { $gte: minPrice };
  else if (maxPrice !== undefined) conditions.price = { $lte: maxPrice };
  if (minDateTime !== undefined && maxDateTime !== undefined)
    conditions.datetime = { $gte: minDateTime, $lte: maxDateTime };
  else if (minDateTime !== undefined)
    conditions.datetime = { $gte: minDateTime };
  else if (maxDateTime !== undefined)
    conditions.datetime = { $lte: maxDateTime };
  if (statuses !== undefined) conditions.status = { $in: statuses };
  const txs = await Tx.find(conditions);

  const income = shop.income.find((income) => income.month === key);

  return res
    .status(200)
    .json({ txs, income: income?.income, refund: income?.refund });
});

router.post("/", async (req, res, next) => {
  const {
    shopName,
    items,
    customerIGName,
    memo,
    datetime,
    seatNum,
    contactNum,
    deliveryAddress,
    pickupAddress,
  } = req.body;
  const shop = await Shop.findOne({ shopName });

  try {
    const line_item_Promises = items.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (product.status !== 0) {
        return res.status(500).json({ error: "product is deleted or hidden" });
      }

      if (product.inventory < item.quantity) {
        return res.status(500).json({ error: "No inventory" });
      }

      return {
        price_data: {
          currency: shop.currency.toLowerCase(),
          product_data: {
            name: product.name,
            metadata: {
              id: item.productId,
              memo: item.memo,
              optionIds: JSON.stringify(item.optionIds),
            },
          },
          unit_amount:
            ((product.priceAfterDiscount === -1
              ? product.price
              : product.priceAfterDiscount) +
              Object.values(item.optionIds).reduce((acc, cur, idx) => {
                const options = product.options[idx].options;

                return (
                  acc +
                  cur.reduce(
                    (acc2, cur2) =>
                      acc2 + options.find((opt) => opt._id.equals(cur2)).price,
                    0
                  )
                );
              }, 0)) *
            100,
        },
        quantity: item.quantity,
      };
    });

    Promise.all(line_item_Promises).then(async (line_items) => {
      const minCharge = MIN_CHARGE[shop?.currency];
      const originalTotal = line_items.reduce(
        (prev, cur) => prev + cur.price_data.unit_amount * cur.quantity,
        0
      );
      let total = originalTotal;

      const percentageOff = shop.discounts.reduce((prev, cur) => {
        if (total >= cur.min * 100) {
          return Math.max(cur.percentageOff, prev);
        } else return prev;
      }, 0);

      let discounted_line_items = line_items;
      if (percentageOff > 0) {
        const discounts = (-total * percentageOff) / 100;
        discounted_line_items = line_items.map((item) => ({
          ...item,
          price_data: {
            ...item.price_data,
            unit_amount:
              (item.price_data.unit_amount * (100 - percentageOff)) / 100,
          },
        }));
        total += discounts;
      }

      if (total <= shop?.minCharge || 0) {
        return res.status(400).json({ error: "Lower than minimum charge" });
      }

      if (minCharge && total < minCharge.min * 100) {
        discounted_line_items.push({
          price_data: {
            currency: shop.currency.toLowerCase(),
            product_data: {
              name: "Platform Fee",
              metadata: {
                id: "-1",
                memo: "",
                optionIds: JSON.stringify([]),
              },
            },
            unit_amount: minCharge.surcharge * 100,
          },
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        // payment_method_options: { wechat_pay: { client: "web" } },
        // , "alipay", "wechat_pay"
        payment_method_types: ["card"],
        mode: "payment",
        metadata: {
          customerIGName,
          memo,
          datetime,
          shopName,
          seatNum,
          contactNum,
          deliveryAddress,
          pickupAddress,
        },
        line_items: discounted_line_items,
        success_url: `${FRONTEND_URL}${shopName}/success`,
        cancel_url: `${FRONTEND_URL}${shopName}/cart/true`,
        custom_text: {
          submit: {
            message:
              percentageOff > 0
                ? `total without discount and platform fee: ${
                    originalTotal / 100
                  };
              total with discount and without platform fee: ${total / 100}`
                : "No Discount",
          },
        },
      });
      return res.status(200).json({ url: session.url });
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.patch("/:id", auth, async (req, res, next) => {
  const shopName = res.locals.shop;
  const { id } = req.params;
  const { memo, datetime, status } = req.body;
  const tx = await Tx.findById(id);

  if (tx.status === 2 || tx.status === 3) {
    return res.status(500).json({ error: "Cannot change completed tx" });
  }

  if (memo !== undefined) tx.memo = memo;
  if (datetime !== undefined) tx.datetime = datetime;

  if (status !== undefined && [1, 2, 3].includes(status)) {
    if (tx.status === 0) {
      if (status === 2) {
        return res.status(500).json({ error: "Cannot Finish Directly" });
      } else if (status === 3) {
        const refund = await stripe.refunds.create({
          payment_intent: tx.payment_intent,
        });

        const shop = await Shop.findOne({ shopName });
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const key = `${month}/${year}`;
        const income = shop.income.find((income) => income.month === key);

        if (income) {
          shop.income = [
            ...shop.income.filter((income) => income.month !== key),
            {
              month: key,
              income: income.income,
              refund: income.refund + tx.price,
            },
          ];
        } else {
          shop.income = [
            ...shop.income,
            { month: key, income: 0, refund: tx.price },
          ];
        }

        await shop.save();
      }
    } else if (tx.status === 1) {
      if (status === 0) {
        return res.status(500).json({ error: "Cannot unconfirm" });
      } else if (status === 3) {
        const refund = await stripe.refunds.create({
          payment_intent: tx.payment_intent,
        });

        const shop = await Shop.findOne({ shopName });
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const key = `${month}/${year}`;
        const income = shop.income.find((income) => income.month === key);

        if (income) {
          shop.income = [
            ...shop.income.filter((income) => income.month !== key),
            {
              month: key,
              income: income.income,
              refund: income.refund + tx.price,
            },
          ];
        } else {
          shop.income = [
            ...shop.income,
            { month: key, income: 0, refund: tx.price },
          ];
        }

        await shop.save();
      } else if (status === 2) {
        const shop = await Shop.findOne({ shopName });
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const key = `${month}/${year}`;
        const income = shop.income.find((income) => income.month === key);

        if (income) {
          shop.income = [
            ...shop.income.filter((income) => income.month !== key),
            {
              month: key,
              income: tx.price + income.income,
              refund: income.refund,
            },
          ];
        } else {
          shop.income = [
            ...shop.income,
            { month: key, income: tx.price, refund: 0 },
          ];
        }

        await shop.save();
      }
    }
    tx.status = status;
  }

  await tx.save();
  return res.status(200).json({ tx });
});

export default router;
