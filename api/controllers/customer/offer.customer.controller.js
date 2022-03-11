const CusOffer = require("../../models/customer.offer.model");
const mongoose = require("mongoose");
const Receipt = require("../../models/receipt.model");
const Product = require("../../models/product.model");
const Offer = require("../../models/offer.model");
const { off } = require("../../models/customer.offer.model");
class customerOfferController {

    addOffers(req, res, next) {
        let data = req.body;

        data['offer_owner'] = req.user.id
        // res.json({
        //     result : data
        // })
        const customerOffer = new CusOffer(data);
        customerOffer.save()
            .then(function (response) {
                res.json({
                    result: response,
                    status: true,
                    message: "Thank you! Your offer has been added"
                });
            })
            .catch(function (error) {
                res.json({
                    result: error,
                    status: false,
                    message: "Sorry! Your offer can not be saved"
                });
            })
    }

    generateOffer(req, res, next) {
        let receipt_id = req.params.receipt_id;
        let added_offer_id = req.body.added_offer_data;
        let offer_owner = req.user.id;

        CusOffer.find(
            { _id: added_offer_id }
        )
            .then(function (response) {
                const data = response[0]["offer_id"]
                console.log(response)
                Receipt.findOneAndUpdate(
                    { _id: receipt_id },
                    { $set: { "added_offer": data } }
                )
                    .then(function (succ) {
                        res.json({
                            result: succ,
                            status: true,
                            message: "offer has now linked to your receipt please proceed for UPC scan"
                        })
                    })
                    .catch(function (err) {
                        res.json({
                            result: errr,
                            status: false,
                            message: "Sorry there was an error while linking your offers"
                        })
                    })

            })
            .catch(function (error) {
                res.json({
                    result: error
                })
            })

    }

    scanUPC = (req, res, next) => {   //here need to access all array and to set array for validation but code doesnot work so work flow has been changed
        const data = req.body.UPC; // now it support only one UPC validation at a time
        console.log("hello")
        Receipt.find(
            { _id: req.params.receipt_id }
        )
            .then(function (response) {
                let R_date = response[0]["purchase_at"];
                let R_id = response[0]["_id"]

                Product.find(
                    { "UPC": data }
                )
                    .then(function (product) {
                        // res.json(product)
                        Offer.find(
                            { 'eligible_products': product[0]["_id"], 'launch_date': { '$gte': R_date } }
                        )
                            .then(function (offers) {
                                let offerLen = offers.length;
                                // console.log(offers)
                                for (let i = 0; i < offerLen; i++) {

                                    let offer_id = offers[i]["_id"];
                                    let reward = offers[i]["reward_amount"]
                                    Receipt.updateOne(
                                        { _id: req.params.receipt_id },
                                        {
                                            $push:
                                                { matched_offer: [{ "offers": offer_id, "amount": reward }] }
                                        }

                                    )
                                        .then(function (succ) { //this will not work/ double res can not be sent
                                            //    console.log(offer_id, "Reward : ", reward);
                                            res.json({
                                                res: "You have Successfully redeemed this one please go for another"
                                            })
                                        })

                                }
                            })
                    })
            })
    }


    lifetime(req, res, next) {
        let customer = req.user.id;
        // console.log(customer) 
        Receipt.find(
            { customer: customer }
        )
            .then(function (ress) {

            })
    }

}


module.exports = customerOfferController;


