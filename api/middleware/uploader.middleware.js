const multer = require("multer");

const storage = multer.diskStorage({
    destination : function(req, file, callBack){
        callBack(null, process.cwd()+"/uploads")
    },
    filename : function(req, file, callBack){
        const filename = Date.now()+file.originalname;
        callBack(null, filename);
    }
});
const imageFilter = function(req, file, callBack){
    let parts = file.originalname.split(".");
    let ext = parts[parts.length - 1];
    // console.log("extention: ", ext);
    if(ext == 'jpg' || ext == 'jpeg' || ext == 'png'){
        callBack(null, true);
    }else{
        callBack(null, false);
    }
}


const upload = multer({
    storage : storage,
    fileFilter : imageFilter
})
module.exports = upload;
