const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const server = express();

const productsRouter = require('./routes/api/products');

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(expressLayouts);

server.use('/api/products', productsRouter);

server.use('/products', require('./routes/api/products'));



server.get('/', (req, res) => {
    res.render('homepage');
});

server.get('/homepage', (req, res) => {
    res.render('homepage');
});

mongoose
  .connect("mongodb://localhost/finalLab", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));

server.listen(4000, () => {
  console.log("Server Started at localhost:4000");
});
