const express = require("express")
const app = express();

const upload = require("../middleware/uploader.middleware");
const isloggedin = require('../middleware/isloggedin.middleware');
const offerController = require("../controllers/offer.controller");
const offerCtrl = new offerController();

const customerOfferController = require("../controllers/customer/offer.customer.controller");
const cusOfferCtrl = new customerOfferController();


const multer = require("multer");
const formHandler = multer();

app.post('/create', isloggedin, upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'promo_image', maxCount: 1 }]), offerCtrl.createOffer);
app.delete('/delete/:id', isloggedin, offerCtrl.deleteOffer);
app.put('/edit/:id', isloggedin, upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'promo_image', maxCount: 1 }]), offerCtrl.editOffer);
app.get('/:id', isloggedin, offerCtrl.getOfferById);




app.post("/add", isloggedin , formHandler.none(),cusOfferCtrl.addOffers);

module.exports = app;