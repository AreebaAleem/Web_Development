const express = require("express");
let router  = express.Router();
const validateProduct = require("../../middlewares/validateProduct");
var {Product} = require("../../models/product");


//get all products array on POSTMAN, instead of array , send product data from dbms
router.get("/",async (req,res)=> {
    // console.log(req.query);
    let products = await Product.find();
    return res.send(products);
});

//getting single product from dbms
router.get("/:id",async (req,res)=> {
    try {
        let product = await Product.findById(req.params.id);
        if(!product)
        return res.status(400).send("Product not found");
        return res.send(product);
    } catch (err) {
        return res.status(400).send("Invalid Product ID");
    }
});

//update record
router.put("/:id",async (req,res)=> {
    let product = await Product.findById(req.params.id);
    product.title = req.body.title;
    product.price = req.body.price;
    await product.save();
    return res.send(product);
});

//delete record
router.delete("/:id",async (req,res)=> {
    let product = await Product.findByIdAndDelete(req.params.id);
    return res.send(product);
});

//insert or add a new record using post method
// router.post("/", async (req,res)=> {

router.post("/",validateProduct, async (req,res)=> {


    let product = new Product;
    product.title = req.body.title;
    product.price = req.body.price;
    await product.save();
    return res.send(product);
});

module.exports = router;

//RESTFUL API