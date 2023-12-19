const express = require("express");
let router = express.Router();
const Order = require("../../models/order");


router.get("/orders/delete/:id", async (req, res) => {
    let order = await Order.findByIdAndDelete(req.params.id);
    req.session.flash = { type: "danger", message: "Order Deleted!" };
    res.redirect("/admin/orders");
});


router.get("/orders", async (req, res) => {
    let orders = await Order.find();
    res.render("admin/orders/index", {
    layout: "adminlayout",
    orders,
    });
});


module.exports = router;
