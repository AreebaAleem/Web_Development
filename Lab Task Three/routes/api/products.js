const express = require("express");
let router  = express.Router();
const validateProduct = require("../../middlewares/validators/validateProduct");
var Product = require("../../models/product");


//get all products array on POSTMAN, instead of array , send product data from dbms
router.get("/",async (req,res)=> {
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
    return res.send(products);
});

//added pagination & filtering

// router.get('/', async (req, res) => {
//     try {
//       const products = await Product.find();
//       res.render('products', { products, layout: 'layout' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });

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
    product.name = req.body.name;
    product.category = req.body.category;
    product.description= req.body.description;
    product.price = req.body.price;
    product.countInStock = req.body.countInStock;
    product.rating = req.body.rating;
    product.numReviews = req.body.numReviews;
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
    product.name = req.body.name;
    product.category = req.body.category;
    product.description= req.body.description;
    product.price = req.body.price;
    product.countInStock = req.body.countInStock;
    product.rating = req.body.rating;
    product.numReviews = req.body.numReviews;
    await product.save();
    return res.send(product);
    
});

module.exports = router;

//Server Side Crud Operation on Products (L_2)
//project sessionauth
