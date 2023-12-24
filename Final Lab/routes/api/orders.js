const express = require("express");
let router = express.Router();
const Order = require("../../models/order");
const jwt = require("jsonwebtoken");
const tokenAuth = require("../../middlewares/tokenAuth");


router.get("/",tokenAuth, async (req, res) => {
  console.log(req.order);
  let orders = await Order.find();
  res.send(orders);
});

router.get("/:id", async (req, res) => {
  let order = await Order.findById(req.params.id);
  res.send(order);
});

router.post("/",async (req, res) => {
  let order = new Order(req.body);
  await order.save();
  let token = jwt.sign({_id:order._id}, "myprivatekey");
  res.send(token);
});

router.delete("/:id",async (req, res) => {
  let order = await Order.findByIdAndDelete(req.params.id);
  res.send(order);
});

router.put("/:id",async (req,res)=> {
  let order = await Order.findByIdAndUpdate(req.params.id, req.body);
  return res.send(order);
});

module.exports = router;
