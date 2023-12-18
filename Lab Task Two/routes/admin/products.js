const express = require("express");
let router = express.Router();
let productValidator = require("../../middlewares/validators/validateProduct");
let Product = require("../../models/product");
const validateProduct = require("../../middlewares/validators/validateProduct");

//render the add form
router.get("/products/add", async (req, res) => {
  res.render("admin/products/add", {
    layout: "adminlayout",
  });
});

//process the add form and redirect to index page
router.post("/products/add", productValidator, async (req, res) => {
  let product = new Product(req.body);
  await product.save();
  req.session.flash = { type: "success", message: "New Product Saved" };
  res.redirect("/admin/products");
});

router.get('/products/edit/:id', async function(req, res) {
  let product = await Product.findById(req.params.id);
  res.render("admin/products/edit", {
    layout: "adminlayout",
    product,
  });
  
});


router.post("/products/edit/:id", productValidator, async (req, res) => {
  let product = await Product.findByIdAndUpdate(req.params.id, req.body);
  req.session.flash = { type: "success", message: "Product Updated!" };
  res.redirect("/admin/products");
});


router.get("/products/delete/:id", async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  req.session.flash = { type: "danger", message: "product Deleted!" };
  res.redirect("/admin/products");
});



router.get("/products", async (req, res) => {
  let products = await Product.find();
  res.render("admin/products/index", {
    layout: "adminlayout",
    products,
  });
});
module.exports = router;

//server side crud operations on products in admin