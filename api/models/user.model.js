const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true, 
        unique : true
    },
    password : {
        required : true,
        type : String
    },
    date_of_birth : {
 
        type : String
    },
    gender : {
        type : String,
        enum : ['male', 'female', 'no'],
        default : "no"
    },
    roles :{
        type : String,
        enum : ['admin', 'customer'],
        default : 'customer'
        },
    status : {
        type : String,
        enum : ['active', 'inactive'],
        default : 'inactive'
    },
    email_confirmed_at : {
        type : String,
    },
    last_signin : {
        type : Date
    },
    locked : {
        type : String,
        enum : ["yes", "no", "Locked_cash_out", "request_for_deactivation"],
        default : "no"
    },
    receipts : [
        {
            type : mongoose.Types.ObjectId,
            ref : "receipt"
        }
    ],


    // ledgers : [
    //     {
    //         type : mongoose.Types.ObjectId,
    //         ref : "ledger"
    //     }
    // ],
    comments : [
        {
        type : mongoose.Types.ObjectId,
        ref : "user"
        }
    ],
    image : [{
        type : String,
        default : null
    }]
},{
    timestamps : true
});



const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;