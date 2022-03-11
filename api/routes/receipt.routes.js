const express = require("express");
const app = express();

const receiptController = require("../controllers/customer/receipt.controller");
const receiptCtrl = new receiptController();

const customerOfferController = require("../controllers/customer/offer.customer.controller");
const cusOfferCtrl = new customerOfferController();
const multer = require("multer");
const formHandler = multer();


const upload = require("../middleware/uploader.middleware");
const isloggedin = require("../middleware/isloggedin.middleware");

app.post("/create", isloggedin, upload.array('images'), receiptCtrl.createReceipt);
app.post("/addoffer/:receipt_id", isloggedin, formHandler.none(), cusOfferCtrl.generateOffer);
app.post("/scanUPC/:receipt_id", isloggedin, formHandler.none(), cusOfferCtrl.scanUPC);
// app.post("/life", isloggedin, formHandler.none(), cusOfferCtrl.lifetime);




module.exports = app;