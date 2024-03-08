import express from "express";
import cors from "cors";
import InitiateMongoServer from "./db.js";
import authRouter from "./routes/auth.js";
import shopRouter from "./routes/shop.js";
import productRouter from "./routes/product.js";
import txRouter from "./routes/tx.js";
import stripeRouter from "./routes/stripe.js";
import { PORT } from "./config.js";

InitiateMongoServer();

const app = express();
const port = PORT || 5000;

app.use(
  cors({
    origin: ["https://shoptime.business"],
  })
);
app.use("/stripe", stripeRouter);
app.use(express.json());
app.use("/logo", express.static("logo"));
app.use("/images", express.static("images"));

app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/shop", shopRouter);
app.use("/tx", txRouter);
app.use("*", (req, res, next) => {
  const error = {
    status: 404,
    message: "Api endpoint does not found",
  };
  next(error);
});

app.listen(port, () => {
  console.log(`${port}`);
});
