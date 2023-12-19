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

router.get('/products/edit/:id', async function (req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      req.session.flash = { type: "danger", message: "Product not found" };
      return res.redirect("/admin/products");
    }

    res.render("admin/products/edit", {
      layout: "adminlayout",
      product,
    });
  } catch (error) {
    console.error(error);
    req.session.flash = { type: "danger", message: "Error fetching product for edit" };
    res.redirect("/admin/products");
  }
});

router.post("/products/edit/:id", productValidator, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);

    if (!product) {
      req.session.flash = { type: "danger", message: "Product not found for update" };
      return res.redirect("/admin/products");
    }

    req.session.flash = { type: "success", message: "Product Updated!" };
    res.redirect("/admin/products");
  } catch (error) {
    console.error(error);
    req.session.flash = { type: "danger", message: "Error updating product" };
    res.redirect("/admin/products");
  }
});

router.get("/products/delete/:id", async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  req.session.flash = { type: "danger", message: "product Deleted!" };
  res.redirect("/admin/products");
});



router.get("/products", async (req, res) => {
  let page = Number(req.query.page?req.query.page:1);
  let perPage = Number(req.query.perPage?req.query.perPage:20);
  let skipRecords = (perPage*(page-1));

  let filter = {};
  if (req.query.category) {
      filter.category = req.query.category;
  }

  if (req.query.price) {
      filter.price = { $lte: parseInt(req.query.price) };
  }

  if (req.query.priceMin && req.query.priceMax) {
      filter.price = { $gte: parseInt(req.query.priceMin), $lte: parseInt(req.query.priceMax) };
  }

  let products = await Product.find(filter).skip(skipRecords).limit(perPage);
  res.render("admin/products/index", {
    layout: "adminlayout",
    products,
  });
});
module.exports = router;

//server side crud operations on products in admin