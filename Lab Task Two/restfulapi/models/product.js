var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10,
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: "Price must be an integer",
        },
        min: [0, "Price must be greater than or equal to 0"],
    },
});

// var productSchema = mongoose.Schema({
//     name: String,
//     price: Number,
// });

var Product = mongoose.model("Product", productSchema);



// function validateProduct(data){
//     const schema = Joi.object({
//         title: Joi.string().min(3).max(10).required(),
//         price: Joi.number().min(0).required(),

//     });

//     return schema.validate(data, {abortEarly: false});

// }

module.exports.Product = Product;
// module.exports.validate = validateProduct;
