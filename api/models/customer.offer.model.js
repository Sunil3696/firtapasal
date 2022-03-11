const mongoose = require("mongoose");

const CustomerOfferSchema = new mongoose.Schema({

    offer_id: [{
        type: mongoose.Types.ObjectId,
        ref: 'offer'
    }],
    added_date: {
        type: Date
    },
    offer_owner: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }

});



const CustomerOfferModel = mongoose.model('customeroffer', CustomerOfferSchema);

module.exports = CustomerOfferModel;