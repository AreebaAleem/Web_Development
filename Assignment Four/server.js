const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");
const sessionAuth = require("./middlewares/sessionAuth");
const admin = require("./middlewares/admin");
const logger = require("./middlewares/logger");

const usersRouter = require('./routes/api/users');
const productsRouter = require('./routes/api/products');
const ordersRouter = require('./routes/api/orders');
const authRoutes = require("./routes/site/auth");

const server = express();
server.use(express.static("public"));
server.set("view engine", "ejs");
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.set('views', path.resolve("./views"));
server.use(expressLayouts);

server.use(cookieParser());
server.use(session({
  secret: "secret-key-it-is!",
  resave: false,
  saveUninitialized: true,
  // cookie: { maxAge: 60000 },
}));

server.use(logger);
server.use(require("./middlewares/common"));


server.use('/api/products', productsRouter);
server.use('/api/users', usersRouter);
server.use('/api/orders', ordersRouter);
server.use("/", authRoutes);

server.get("/about", (req, res) => {
  res.render("about");
});

server.get("/contact", (req, res) => {
  res.render("contact");
});

server.get("/products", (req, res) => {
  res.render("products");
});

server.get("/homepage", async (req, res) => {
  let products = await Product.find().sort({ price: 1 });
  res.render("homepage", { products });
});

server.get("/order", async (req, res) => {
  let orders = await Order.find();
  res.render("orderPage", { orders });
});

server.get("/users", async (req, res) => {
  let users = await User.find();
  res.render("userPage", { users });
});

server.get("/", async (req, res) => {
  let products = await Product.find().sort({ price: 1 });
  res.render("homepage", { products });
});
server.use(
  "/admin",
  sessionAuth,
  admin,
  require("./routes/admin/products")
);
server.use(
  "/admin",
  admin,
  require("./routes/admin/orders")
);
server.use("/", require("./routes/site/auth"));
server.use("/", require("./routes/api/products"));
server.use("/", require("./routes/api/orders"));

mongoose
  .connect("mongodb://localhost/mernstack", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));

server.listen(4000, () => {
  console.log("Server Started at localhost:4000");
});
