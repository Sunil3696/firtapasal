const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    UPC : {
        type : String,
        required : true,
        minlength : 13
    },
    size : {
        type : Number,
        required : true
    },
    units : {
        type : String,
        enum : ['g', 'kg', 'ml', 'ltr'],
        required : true
    },
    comment : [{
        type : String,
        default : null
    }],
    UPC_image : {
        type : String,
        default : null
    },
    category: {
        type : mongoose.Types.ObjectId,
        ref : "category"
    },
    under_brand : {
        type : mongoose.Types.ObjectId,
        ref : "brand"
    },
    retailers : [
        {
            type : mongoose.Types.ObjectId,
            ref : 'retailer'
        }
    ]

}, {
    timestamps : true
});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;