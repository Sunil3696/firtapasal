const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    status : {
        type : String,
        enum : ['active', 'inactive'],
        default : 'inactive'
    },
    validated_at : {
        type : Date,
        default : null
    },
    added_by : {
        type : mongoose.Types.ObjectId,
        ref : "user"
    }



},{
    timestamps : true
});


const BrandModel = mongoose.model("brand", BrandSchema);

module.exports = BrandModel;