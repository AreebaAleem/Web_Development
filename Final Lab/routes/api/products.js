const express = require("express");
let router = express.Router();
let productValidator = require("../../middlewares/validators/validateProduct");
let Product = require("../../models/product");

router.get("/add", async (req, res) => {
    res.render("products/add"); 
  });
  

router.post("/add", productValidator, async (req, res) => {
  let product = new Product(req.body);
  await product.save();
  res.redirect("/products");
});

router.get('/edit/:id', async function (req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.redirect("/products");
    }

    res.render("products/edit", {
      product,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/products");
  }
});

router.post("/edit/:id", productValidator, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);

    if (!product) {
      return res.redirect("/products");
    }
    res.redirect("/products");
  } catch (error) {
    console.error(error);
    res.redirect("/products");
  }
});

router.get("/delete/:id", async (req, res) => {
    try {
      let product = await Product.findByIdAndDelete(req.params.id);
  
      if (!product) {
        return res.redirect("/products");
      }
      res.redirect("/products");
    } catch (error) {
      console.error(error);
      res.redirect("/products");
    }
  });



router.get("/", async (req, res) => {

  let products = await Product.find();
  res.render("products/index", {
    products,
  });
});
module.exports = router;

