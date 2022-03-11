const BrandModel = require("../models/brand.model");


class brandController {
    createBrand(req, res, next) {
        console.log(req.user._id);
        let data = req.body;
        data["added_by"] = req.user.id;
        //  console.log(typeof(data));
        let brand = new BrandModel(data);
        brand.save()
            .then(function (response) {
                res.status(200).json({
                    status: true,
                    result: brand,
                    message: "Brand has been added"
                });
            })
            .catch(function (error) {
                res.status(200).json({
                    status: false,
                    result: error,
                    message: "There was an error storing brands"
                });
            });
    }


    editBrand(req, res, next) {
        let data = req.body;
        // let brand = new BrandModel(data);
        BrandModel.updateOne(
            {
                _id: req.params.id
            }, {
            $set: data
        }
        )
            .then(function (response) {
                res.status(200).json({
                    result: response,
                    message: "Brand has been updated successfully"
                });
            })
            .catch(function () {
                res.json({
                    result: null,
                    message: "There was an error while updating Brand"
                })
            });
    }


    deleteBrand(req, res, next) {
        BrandModel.deleteOne({
            _id: req.params.id
        })
            .then(function (response) {
                res.status(200).json({
                    result: response,
                    message: "Brand has been Deleted successfully"
                })
            })
            .catch(function(){
                res.json({
                    result: response,
                    message: "There was an error while Deleting your Brand"
                })
            })
    }
}

module.exports = brandController;