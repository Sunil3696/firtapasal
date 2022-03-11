const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    summary : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ['active', 'inactive', 'expired', 'unlaunched'],
        default : 'inactive'
    },
    description :{
        type : String,
        required : true
    },
    launch_date : {
        type : Date,
        required : true
    },
    end_date : {    
        type : Date,
        required : true
    },
    hard_end_date : {
        type : Date,
        required : true
    },
    redemption_qty : {
        min_qty : {
            type : Number,            
        },
        redemption_limit : {
            type : Number,           
        }
    },
    main_image : {
        type : String,
        default : null
    },
    promo_image : {
        type : String,
        default : null
    },
    eligible_products : [
        {
            type : mongoose.Types.ObjectId,
            ref : 'product'
        }
    ],
    reward_amount: {
        type : Number,
        required : true
    },
    available_at : [
        {
            type : mongoose.Types.ObjectId,
            ref : 'retailer'
        }
    ],

});




const OfferModel = mongoose.model('offer', OfferSchema);
module.exports = OfferModel;
