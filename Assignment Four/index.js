const express = require("express")
const app = express()
const mongoose  = require("mongoose");
const {createProduct, getAllProducts, deleteProduct, updateProduct} = require("./productsOperations");
app.use(express.json()); //middleware

mongoose
.connect("mongodb://localhost/mernstack",{
    useNewUrlParser:true,
     useUnifiedTopology:true,
    })
.then(async() => {
    console.log("Connection to MongoDB created");
    // let product = await createProduct("Lounge table", 4000, ["black","classy"]);
    // console.log(product);

    // let allProducts = await getAllProducts();
    // console.log(allProducts);

    // console.log(await deleteProduct("6576b0a09a1c59017869074e"));

    let updatedProduct = updateProduct("6576af7eb3e3c9cf24d74fee", "Table Updated",2000,[]);


})
.catch((err) => {
    console.log("Error connecting");
    console.log(err);
});
app.listen(3001);