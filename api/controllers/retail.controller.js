const Retailer = require("../models/retailer.model");

class retailController { 
    addRetail(req, res, next){
       let data = req.body;
    //    console.log(data);

    if(req.files){
        let icon = [];
        req.files.map(function(o){
            icon.push(o.filename);
        });
        data.icon = icon;
    }
    let retailer = new Retailer(data);
    // console.log(data);
        retailer.save()
        .then(function(response){
            res.status(200).json({
                result : response,
                status : true,
                message : "Retailer has been added"
            })
        })
        .catch(function(error){
            res.status(200).json({
                result : error,
                status : false,
                message : "Retailer could not be added"
            })
        })
    }


    editRetail(req, res, next){
        let data = req.body;
        let id = req.params.id;
        Retailer.updateOne(
            {_id : id },
            {$set: data}
            )
            .then(function(response){
                res.status(203).json({
                    status: true,
                    result : response,
                    message : "Retailer has been edited"
                });
            })
            .catch(function(error){
                res.status(203).json({
                    status: null,
                    result : error,
                    message : "Retailer has been edited"
                });
            })
            
    }


    deleteRetail(req, res, next){
        let id = req.params.id;

        Retailer.deleteOne(
            { _id : id} 
        )
        .then(function(response){
            res.status(203).json({
                status: true,
                result : response,
                message : "Retailer has been deleted"
            });
        })
        .catch(function(error){
            res.status(203).json({
                status: null,
                result : error,
                message : "Retailer could not be deleted"
            });
        })
    }

}
module.exports = retailController;