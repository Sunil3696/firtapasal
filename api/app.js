const express = require("express");
const app = express();
require("./db.init");
app.use(express.json());
app.use(express.urlencoded({
    extended : false
}));




//importing routes
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product/product.routes");
const retailRoutes = require("./routes/retailer.routes");
const offerRoutes = require("./routes/offer.routes");
const receiptRoutes = require("./routes/receipt.routes");

//handling error
app.use(function (error, req, res, next) {
    console.log("ERROR");
    res.status(400).json({
        "error": "ERROR"
    });

});


//mountinh routes
app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/retailer', retailRoutes );
app.use('/offer', offerRoutes);
app.use('/receipt', receiptRoutes);










// listeing server
app.listen(3000, "localhost", function (error, success) {
    if (error) {
        console.log("error while starting server", error);
    } else {
        console.log("Server started at port 3000",);

    }
});