const multer = require('multer');
const path = require('path');

//set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../../public/img/package'));
    },
    filename: function(req, file, cb) { 
        let filename_img = file.fieldname + '-' + Date.now() + Math.floor(Math.random() * 9999) + path.extname(file.originalname);
        cb(null, filename_img);
    }
});

const fileFilter = (req,file,cd) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cd(null,true)
    }
    else{
        cd(null,false)
    }
    // cd(null,true)
}

const uploads = multer({
    storage: storage, fileFilter : fileFilter
}).fields([
    {name: 'main_img', maxCount: 1},
    {name: 'sub_imgs', maxCount: 30}
]);


module.exports = uploads;
