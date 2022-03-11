const Offer = require("../models/offer.model");

class offerController {
    createOffer(req, res, next) {
        // res.json({
        //     result : req.body
        // });

        let data = req.body;
        // res.json({
        //     result : req.body.redemption_qty.min_qty
        // });

        if (req.files) {
            // console.log(req.files['main_image'][0].filename);
            data.main_image = req.files['main_image'][0].filename;
            data.promo_image = req.files['promo_image'][0].filename;
        }


        data.redemption_qty.min_qty = Number(req.body.redemption_qty.min_qty);
        data.redemption_qty.redemption_limit = Number(req.body.redemption_qty.redemption_limit);
        let offer = Offer(data);
        offer.save()
            .then(function (response) {
                res.json({
                    result: response,
                    status: true,
                    message: "has been added"
                })
            })
            .catch(function (error) {
                res.json({
                    result: error,
                    status: false,
                    message: "Not added"
                })
            });
    }

    deleteOffer(req, res, next) {
        let id = req.params.id;
        Offer.findOne(
            { _id: id }
        )
            .then(function (response) {
                let offerName = response.name
                Offer.deleteOne(
                    {
                        _id: id
                    }
                )
                    .then(function (response) {
                        res.json({
                            result: response,
                            status: true,
                            message: offerName + " Offer has been deleted"
                        })
                    })
                    .catch(function (error) {
                        res.json({
                            result: error,
                            status: false,
                            message: "Offer can not be deleted"
                        })
                    })
            })
            .catch(function (error) {
                res.json({
                    result: null,
                    status: false,
                    message: "Offer not found to delete"
                })
            })
    }

    editOffer(req, res, next){
        let data = req.body;
        if (req.files) {
            data.main_image = req.files['main_image'][0].filename;
            data.promo_image = req.files['promo_image'][0].filename;
        }
        data.redemption_qty.min_qty = Number(req.body.redemption_qty.min_qty);
        data.redemption_qty.redemption_limit = Number(req.body.redemption_qty.redemption_limit);
        
        Offer.updateOne(
            { _id : req.params.id},
            { $set : data }
        )
        .then(function(response){   
            res.status(200).json({
                result : response,
                status : true,
                message : "Offer has been edited Successfully"
            })
        })
        .catch(function(error){
            res.status(200).json({
                result : error,
                status : false,
                message : "Offer can not be edited"
            })
        });

    }

    getOfferById(req, res, next){
        let id = req.params.id;

        Offer.find(
            { _id : id}
        )
        .then(function(response){
            res.json({
                result: response,
                status: true,
                message: "Offer has been fetched"
            })
        })
        .catch(function(error){
            res.json({
                result: error,
                status: false,
                message: "Could not find any offer"
            })
        })
    }


}

module.exports = offerController;