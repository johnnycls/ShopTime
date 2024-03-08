import express from "express";
import auth from "../middlewares/auth.js";
import multer from "multer";
import { unlink } from "fs";
import Product from "../models/product.model.js";
import Shop from "../models/shop.model.js";
import { ObjectId } from "mongodb";

const router = express.Router();
const upload = multer({ dest: "images/" });

router.get("/:shopName", async (req, res, next) => {
  const { categories, minPrice, maxPrice, statuses } = req.query;
  const shop = await Shop.findOne({ shopName: req.params.shopName });

  if (!shop || shop.isHidden) {
    return res
      .status(404)
      .json({ msg: "Shop Not Found or is Hidden or Deleted" });
  }

  const productIds = shop.products;
  const obj_ids = productIds.map(function (id) {
    return ObjectId(id);
  });

  const conditions = { _id: { $in: obj_ids } };
  if (categories !== undefined) conditions.categories = { $in: categories };
  if (minPrice !== undefined && maxPrice !== undefined)
    conditions.price = { $gte: minPrice, $lte: maxPrice };
  else if (minPrice !== undefined) conditions.price = { $gte: minPrice };
  else if (maxPrice !== undefined) conditions.price = { $lte: maxPrice };
  if (statuses !== undefined) conditions.status = { $in: statuses };

  const products = await Product.find(conditions);
  return res.status(200).json({ products });
});

router.get("/:id", async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });
  return res.status(200).json({ product });
});

router.post("/", auth, upload.array("images"), async (req, res, next) => {
  const {
    name,
    options,
    description,
    categories,
    price,
    status,
    priceAfterDiscount,
    inventory,
  } = JSON.parse(req.body.data);
  const shopName = res.locals.shop;
  const shop = await Shop.findOne({ shopName });

  const product = new Product({
    shop: shopName,
    name,
    images: req.files.map((file) => file.path),
    options,
    description,
    categories,
    price,
    status,
    priceAfterDiscount,
    inventory,
  });
  await product.save();
  shop.products.push(product._id);
  await shop.save();

  return res.status(200).json({ product });
});

router.patch("/", auth, upload.array("images"), async (req, res, next) => {
  const {
    _id,
    name,
    options,
    description,
    categories,
    price,
    status,
    priceAfterDiscount,
    inventory,
  } = JSON.parse(req.body.data);
  const images = req.files.map((file) => file.path);
  const shopName = res.locals.shop;
  const product = await Product.findOne({ _id });

  if (product !== undefined) {
    if (images !== undefined && images.length > 0) {
      for (const file of product.images) {
        unlink(file, (err) => {
          if (err) console.log(err.message);
        });
      }
      product.images = req.files.map((file) => file.path);
    }

    if (name !== undefined) product.name = name;
    if (options !== undefined) product.options = options;
    if (description !== undefined) product.description = description;
    if (categories !== undefined) product.categories = categories;
    if (price !== undefined) product.price = price;
    if (priceAfterDiscount !== undefined)
      product.priceAfterDiscount = priceAfterDiscount;
    if (inventory !== undefined) product.inventory = inventory;

    if (status !== undefined) {
      product.status = status;
      if (status === 2) {
        for (const file of product.images) {
          unlink(file, (err) => {
            if (err) console.log(err.message);
          });
        }
      }
    }
  }

  await product.save();
  return res.status(200).json({ product });
});

export default router;
