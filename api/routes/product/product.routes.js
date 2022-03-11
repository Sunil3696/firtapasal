const express = require("express");
const app = express();

const brandController = require("../../controllers/brand.controller");
const brandCtrl = new brandController;
const isLoggedIn = require("../../middleware/isloggedin.middleware");
const multer = require("multer");
let formHandler = multer();

const ProductController = require("../../controllers/product.controller");
const productCtrl = new ProductController;
//brand related Routes
app.post('/brand' ,formHandler.none() ,isLoggedIn ,brandCtrl.createBrand);
app.put('/brand/:id', formHandler.none(), isLoggedIn, brandCtrl.editBrand);
app.delete('/brand/:id', formHandler.none(), isLoggedIn, brandCtrl.deleteBrand);



//Product Related Routes
app.post('/create', formHandler.none(), isLoggedIn, productCtrl.createProduct );
app.delete('/delete/:id', formHandler.none(), isLoggedIn, productCtrl.deleteProduct);
app.put('/edit/:id', formHandler.none(), isLoggedIn, productCtrl.editProduct);
app.get('/:id', formHandler.none(), isLoggedIn, productCtrl.getProductById);
app.get('/brandid/:id', formHandler.none(), isLoggedIn, productCtrl.getAllProductByBrand);
app.get('/size/:size/:brandid',formHandler.none(), isLoggedIn, productCtrl.getAllProductBySize);



// app.get('/postjobs', formHandler.none(), isLoggedIn, productCtrl.postjobs);



module.exports = app;