const express = require("express");
const app = express();

const authController = require("../controllers/auth.controller");
let authCtrl = new authController();

let upload = require("../middleware/uploader.middleware");
const multer = require("multer");
let formHandler = multer();

app.post('/login', formHandler.none(), authCtrl.login);
app.post('/register', upload.array('image') ,authCtrl.register);





module.exports = app;