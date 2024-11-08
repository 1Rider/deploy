const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
	return res.status(200).send({ message: "welcome to ecommerce website" });
})

const authRouters = require("./src/routes/auth.route.js");
app.use("/auth", authRouters);


const userRouters = require("./src/routes/user.route.js");
app.use("/api/users", userRouters);



const productRouter = require("./src/routes/product.route.js");
app.use("/api/products", productRouter);


const adminProductRouter = require("./src/routes/adminProduct.route.js");
app.use("/api/admin/products", adminProductRouter);


const cartRouter = require("./src/routes/cart.route.js");
app.use("/api/cart", cartRouter);



const cartItemRouter = require("./src/routes/cartItem.route.js");
app.use("/api/cart_items", cartItemRouter);


const orderRouter = require("./src/routes/order.route.js");
app.use("/api/orders", orderRouter);

const adminOrderRouter = require("./src/routes/adminOrder.route.js");
app.use("/api/admin/orders", adminOrderRouter);

const reviewRouter = require("./src/routes/review.route.js");
app.use("/api/reviews", reviewRouter);


const ratingRouter = require("./src/routes/rating.route.js");
app.use("/api/ratings", ratingRouter);





module.exports = app;