const mongoose = require("mongoose");

const dbURL = "mongodb://localhost:27017/firtapaisa";

mongoose.connect(dbURL, function(err, succ){
    if(err){
        console.log("Error in connecting to mongoose database");
    }else{
        console.log("Mongoose has been connected successfully");
    }
});