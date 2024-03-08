import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Shop from "../models/shop.model.js";
import auth from "../middlewares/auth.js";
import { ROOT_PASSWORD, JWT_SECRET } from "../config.js";

const router = express.Router();

// Register or Reset Password (By Admin Only)
router.post("/register", async (req, res) => {
  const { shopName, password, rootPassword } = req.body;

  try {
    if (rootPassword !== ROOT_PASSWORD) {
      return res.status(400).json({ msg: "Root Password Incorrect" });
    }

    // check if the user already exists
    let shop = await Shop.findOne({ shopName });
    if (!shop) {
      // create new user
      shop = new Shop({
        shopName,
        password,
      });
    }

    // hash user password
    const salt = await bcrypt.genSalt(10);
    shop.password = await bcrypt.hash(password, salt);
    await shop.save();

    // return jwt
    const payload = {
      shop: {
        id: shop.shopName,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "30 days" }, (err, token) => {
      if (err) console.log(err.message);
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { shopName, password } = req.body;

  try {
    // check if the user exists
    let shop = await Shop.findOne({ shopName });
    if (!shop) {
      return res.status(400).json({ msg: "Shop name or password incorrect" });
    }

    // check is the encrypted password matches
    const isMatch = await bcrypt.compare(password, shop.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Email or password incorrect" });
    }

    // return jwt
    const payload = {
      shopName: {
        id: shop.shopName,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "30 days" }, (err, token) => {
      if (err) console.log(err.message);
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const shopName = res.locals.shop;
    const shop = await Shop.findOne({ shopName });
    return res.status(200).json(shop);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/changePassword", auth, async (req, res) => {
  const shopName = res.locals.shop;
  const { password } = req.body;
  console.log(password);

  try {
    // check if the user exists
    let shop = await Shop.findOne({ shopName });
    if (!shop) {
      return res.status(400).json({ msg: "Shop name incorrect" });
    }

    // hash user password
    const salt = await bcrypt.genSalt(10);
    shop.password = await bcrypt.hash(password, salt);
    await shop.save();

    return res.status(200).json({ shop });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

export default router;
