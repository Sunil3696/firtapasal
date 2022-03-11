const Product = require("../models/product.model");
const Brand = require("../models/brand.model");

class ProductController {
    createProduct(req, res, next) {
        const data = req.body
        //   res.json({
        //       result : data
        //   });
        let product = new Product(data);
        product.save()
            .then(function (response) {
                res.json({
                    result: response,
                    status: true,
                    message: "Product added successfully"
                });
            })
            .catch(function (error) {
                res.json({
                    result: error,
                    status: false,
                    message: "Error in adding Product"
                });
            })
    }



    deleteProduct(req, res , next){
        let id = req.params.id;
       Product.findOne(
           { _id : id }
       )
       .then(function(product){
            Product.deleteOne(
                { _id : id}
            )
            .then(function(succ){
                res.json({
                    result : succ,
                    status : true,
                    message : "Product has been deleted"
                })
            })
            .catch(function(error){
                res.json({
                    result : null,
                    status : false,
                    message : "There was an error while deletinh Product"
                })
            })
       })
       .catch(function(error){
           res.json({
            result : null,
            status : false,
            message : "Product not found"
           });
       })
    }


    editProduct(req, res , next){
        let data = req.body;
        console.log(data);
        Product.updateOne(
            { _id : req.params.id},
            { $set : data },
            // { upsert : true }
        )
        .then(function(response){
            res.status(200).json({
                result : response,
                status : true,
                message : "Product has been edited"
            })
        })
        .catch(function(error){
            res.json({
                result : null,
                status : false,
                message : "Product could not be edited"
            })
        });
      
    }


    getProductById(req, res, next){
        let id = req.params.id;
        Product.findOne(
            { _id : id }
        )
        .then(function(product){
            if(product){
             res.json({
                 result : product,
                 status : true,
                 message : "Product has been fetched"
             });
            }else{
             res.status(404).json({
                 result : null,
                 status : false,
                 message : "No product Found"
             });
            }
         })
         .catch(function(error){
             res.json({
                 result: error,
                 status : false,
                 message : "There was an problem while fetching"
             })
         });
    }

    getAllProductByBrand(req, res, next){
        let brandid = req.params.id;
        Product.find(
            { under_brand : brandid }
        ).then(function(products){
            res.json({
                result : products,
                status: true,
                message : "Products has been fetched"
            });
        })
        .catch(function(error){
            res.json({
                result : null,
                status: false,
                message : "Couldnot fetch product"
            });
        })
    }

    getAllProductBySize(req, res, next){
        let size = req.params.size;
        let brandid = req.params.brandid;
        Product.find(
            { size: size,
            under_brand : brandid 
            }
        ).then(function(products){
            res.json({
                result : products,
                status: true,
                message : "Products has been fetched"
            });
        })
        .catch(function(error){
            res.json({
                result : null,
                status: false,
                message : "Couldnot fetch product"
            });
        })
    }


}

module.exports = ProductController;