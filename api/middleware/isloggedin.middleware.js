const jwt = require("jsonwebtoken");

const isLoggedIn = function (req, res, next) {
    let token = "";

    if (req.headers['authorization']) {
        token = req.headers['authorization'];
    }
    if (req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
    }
    if (req.query.token) {
        token = req.query.token;
    }
    if (token == ""){
        res.status(400).json({
            result : null,
            status : true,
            message : "Unauthorized access"
        });
    }else{
        const data = jwt.verify(token, "Balami");
        if (!data){
            res.status(403).jsob({
                result : null,
                status : false,
                message : "Unauthorized access or invalid token data"
            });
        }else{
            req.user = data;
            console.log(data);
            next();
        }
        }



        
   
}


module.exports = isLoggedIn;