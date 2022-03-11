const mongoose = require("mongoose");

const ReceiptSchema = new mongoose.Schema({
    customer : {
        type : mongoose.Types.ObjectId,
        ref: 'user'
    },
    retailer : {
        type : mongoose.Types.ObjectId,
        ref : "retailer"
    },
    total :{
        type : Number,
        required : true
    },
    purchase_at : {
        type : Date,
        required : true
    },
    validation_type : {
        type : String, 
        enum : ['ocr', 'receipt', 'admin_tools'],
        default : 'receipt'
    },
    comments : [{
        text : {
            type : String
        },
        added_by : {
            type : mongoose.Types.ObjectId
        }
    }],
    matched_offer :[
        {
            offers : {
                type: mongoose.Types.ObjectId,
                ref : 'offer'
            },
            amount : {
                type : Number
            }
        }
    ],
    added_offer : [{
        type : mongoose.Types.ObjectId,
        ref : 'offer'
    }],
    images : [
        {
            type : String,
            default : null
        }
    ],
    invalid_reason : {
        type: String,
        enum : ['fraud', 'slot_fraud', 'tempered', 'too old', 'pending verification'],
        default : 'pending verification'
    },
    receipt_item : [{
        name : {
           type : String
        },
        UPC : {
            type : String,
            ref : 'product'
        },
        qty : {
            type : Number,
        },
        total: {
            type : Number
        },
        verified_at :{
            type : Date
        }
    }]

}, {
    timestamps : true
});



const ReceiptModel = mongoose.model('receipt', ReceiptSchema);

module.exports = ReceiptModel;