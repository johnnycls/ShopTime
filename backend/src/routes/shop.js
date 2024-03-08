import express from "express";
import auth from "../middlewares/auth.js";
import multer from "multer";
import Shop from "../models/shop.model.js";
import { unlink } from "fs";
import Product from "../models/product.model.js";

const router = express.Router();
const upload = multer({ dest: "images/logo/" });

router.get("/", async (req, res, next) => {
  const shops = await Shop.find({ isHidden: false }).lean();
  return res.status(200).json({
    shops: shops.map((shop) => ({
      ...shop,
      password: undefined,
      income: undefined,
    })),
  });
});

router.get("/:shopName", async (req, res, next) => {
  const shop = await Shop.findOne({ shopName: req.params.shopName });
  if (!shop || shop.isHidden) {
    return res
      .status(404)
      .json({ msg: "Shop Not Found or is Hidden or Deleted" });
  }
  return res.status(200).json({
    shopName: shop.shopName,
    displayName: shop.displayName,
    description: shop.description,
    categories: shop.categories,
    productCategories: shop.productCategories,
    products: shop.products,
    isHidden: shop.isHidden,
    noteToCustomers: shop.noteToCustomers,
    link: shop.link,
    currency: shop.currency,
    logo: shop.logo,
    discounts: shop.discounts,
    igNameRequired: shop.igNameRequired,
    seatNumRequired: shop.seatNumRequired,
    contactNumRequired: shop.contactNumRequired,
    deliveryAddressRequired: shop.deliveryAddressRequired,
    pickupAddressRequired: shop.pickupAddressRequired,
    minCharge: shop.minCharge,
  });
});

router.patch("/", auth, async (req, res, next) => {
  const {
    description,
    categories,
    isHidden,
    noteToCustomers,
    link,
    displayName,
    currency,
    discounts,
    igNameRequired,
    seatNumRequired,
    contactNumRequired,
    deliveryAddressRequired,
    pickupAddressRequired,
    minCharge,
  } = req.body;
  const shopName = res.locals.shop;
  const shop = await Shop.findOne({ shopName });

  if (description != undefined) shop.description = description;
  if (categories != undefined) shop.categories = categories;
  if (isHidden != undefined) shop.isHidden = isHidden;
  if (noteToCustomers != undefined) shop.noteToCustomers = noteToCustomers;
  if (link != undefined) shop.link = link;
  if (displayName != undefined) shop.displayName = displayName;
  if (currency != undefined) shop.currency = currency;
  if (discounts != undefined) shop.discounts = discounts;
  if (igNameRequired != undefined) shop.igNameRequired = igNameRequired;
  if (seatNumRequired != undefined) shop.seatNumRequired = seatNumRequired;
  if (contactNumRequired != undefined)
    shop.contactNumRequired = contactNumRequired;
  if (deliveryAddressRequired != undefined)
    shop.deliveryAddressRequired = deliveryAddressRequired;
  if (pickupAddressRequired != undefined)
    shop.pickupAddressRequired = pickupAddressRequired;
  if (minCharge != undefined) shop.minCharge = minCharge;

  await shop.save();
  return res.status(200).json(shop);
});

router.patch("/logo", auth, upload.single("logo"), async (req, res, next) => {
  const shopName = res.locals.shop;
  const shop = await Shop.findOne({ shopName });
  const originalLogoPath = shop.logo;
  if (originalLogoPath)
    unlink(originalLogoPath, (err) => {
      if (err) console.log(err.message);
    });

  shop.logo = req.file.path;
  await shop.save();
  return res.status(200).json({ logo: shop.logo });
});

router.post("/productCategories", auth, async (req, res, next) => {
  const { productCategories } = req.body;
  const shopName = res.locals.shop;
  const shop = await Shop.findOne({ shopName });

  if (productCategories != undefined) {
    shop.productCategories = shop.productCategories.concat(productCategories);
  }
  await shop.save();
  return res.status(200).json(shop.productCategories);
});

router.patch("/productCategories", auth, async (req, res, next) => {
  const { productCategories } = req.body;
  const shopName = res.locals.shop;
  const shop = await Shop.findOne({ shopName });

  if (productCategories !== undefined) {
    for (let productCategory of productCategories) {
      shop.productCategories = [
        ...shop.productCategories.filter(
          (cat) => !cat._id.equals(productCategory._id)
        ),
        productCategory,
      ];
    }
  }
  await shop.save();
  return res.status(200).json(shop.productCategories);
});

router.delete("/productCategories", auth, async (req, res, next) => {
  const { productCategoryIds } = req.body;
  const shopName = res.locals.shop;
  const shop = await Shop.findOne({ shopName });

  if (productCategoryIds !== undefined) {
    for (let productCategoryId of productCategoryIds) {
      shop.productCategories = [
        ...shop.productCategories.filter(
          (cat) => !cat._id.equals(productCategoryId)
        ),
      ];

      const products = await Product.find({
        categories: { $in: productCategoryIds },
      });
      products.forEach(async (product) => {
        product.categories = product.categories.filter(
          (cat) => !cat._id.equals(productCategoryId)
        );
        await product.save();
      });
    }
  }
  await shop.save();
  return res.status(200).json(shop.productCategories);
});

export default router;
