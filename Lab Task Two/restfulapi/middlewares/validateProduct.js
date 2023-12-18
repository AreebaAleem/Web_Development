// const {validate} = require("../models/product");
// function validateProduct(req,res,next){
//     let {error} = validate(req.body);
//     if (error) return res.send(400).send(error.details[0].message);
//     next();
// };

// module.exports = validateProduct;

const mongoose = require("mongoose");
const { Product } = require("../models/product");

async function validateProduct(req, res, next) {
        const product = new Product(req.body);
        await product.validate();
        next();
};

module.exports = validateProduct;
