const Receipt = require("../../models/receipt.model");


class receiptController {
    createReceipt(req, res, next) {
        let data = req.body;
        data['customer'] = req.user.id
        if (req.files) {
            let images = [];
            req.files.map(function (o) {
                images.push(o.filename);
            });
            data.images = images;
        }
  
        // var today  = new Date();
        // const nowd = today.toLocaleDateString("en-US"); 
         
        // let diff = ( nowd - req.body.purchase_at);
        // console.log(diff)
        // res.json({
        //     result : diff
            
        // })
        const receipt = new Receipt(data);
        receipt.save()
        .then(function(response){
            res.json({
                result : response,
                status : true,
                message : "Success Please choose the offers"
            })
        })
        .catch(function(error){
            res.json({
                result : error,
                status : false,
                message : "Failed"
            })
        })
    }

}


module.exports = receiptController;