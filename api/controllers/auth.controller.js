const UserModel = require("../models/user.model");
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");

function generateToken(usr){
    const token = jwt.sign({
        name : usr.name,
        email: usr.email,
        status : usr.status,
        id : usr._id
    }, "Balami");
    return token;

}
class authController {
    login(req, res, next){
        // console.log(req.body)
       UserModel.findOne({
           email : req.body.email
       })
       .then(function(usr){
            if(usr){
             
                let chkPwd = passwordHash.verify(req.body.password, usr.password);
                if (chkPwd){
                    if(usr.status == "active"){
                        res.json({
                            result: usr,
                            status : true,
                            token : generateToken(usr),
                            message : "Login succeed"
                        });
                    }else{
                        res.status(400).json({
                            result : null,
                            status : false,
                            message : "User is not activated"
                        });
                    }
                }else{
                    res.json({
                        result : null, 
                        status : false,
                        message : "Please check your email or password"
                    });
                }
            }else{
                res.json({
                    status : false,
                    result : null,
                    message : "User not found"
                });
            }
       })
       .catch();
    }


    register(req, res, next){
        let data = req.body;
        // console.log("DATA", data);
        if (req.files){
            let image = [];
            req.files.map(function(o){
                image.push(o.filename);
            });
            data.image = image;
        }

        data.password = passwordHash.generate(req.body.password);

        let user = new UserModel(data);
        user.save()
                .then(function(response){
                    res.status(200).json({
                        status : true, 
                        result : user,
                        message : "User has been added"
                    });
                })
                .catch(function(error){
                    res.json({
                        result : error,
                        status : false,
                        message : "there was an error while storing user data"
                    });
                });
      
    }
}

module.exports = authController;