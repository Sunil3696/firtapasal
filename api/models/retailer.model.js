const mongoose = require("mongoose");

const RetailerSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        unique : true
    },
    status : {
        type : String,
        enum : ['active', 'inactive', 'pending_confirmation'],
        default : 'inactive'
    },
    age_days : {
        type : Number,
        required : true
    },
    icon : [
        {
            type : String,
            default : null
        }
    ],
    return_enable :{
        type : Boolean,
        default : true
    }
}, {
    timestamps : true
});


const RetailerModel = mongoose.model('retailer', RetailerSchema);

module.exports = RetailerModel;