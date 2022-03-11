const express = require("express");
const app = express();
const upload = require("../middleware/uploader.middleware");
const isLoggedIn = require("../middleware/isloggedin.middleware");
const retailController = require('../controllers/retail.controller');
const retailCtrl = new retailController();

app.post('/add', isLoggedIn, upload.array('icon'), retailCtrl.addRetail);
app.post('/edit/:id', isLoggedIn, upload.array('icon'), retailCtrl.editRetail);
app.post('/delete/:id', isLoggedIn, retailCtrl.deleteRetail);




module.exports = app;