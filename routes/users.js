var express = require('express');
var router = express.Router();
// var userModel = require('../mongoose').model("User");
var multer = require('multer');


var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, 'Movies/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname)
    }
});

router.post('/save', function (req, res, next) {
    upload(req,res,function(err){
        if(err){
            console.log(err);
            res.json({error_code:1,err_desc:err});
            return;
        }
        res.json({error_code:0,err_desc:null});
    });
    // console.log(req);
    // res.send('post successful');
    // user.save(function (err, result) {
    //     if (err) {
    //         res.status(400);
    //         res.send('Error saving the user ' + err);
    //     }
    //     else
    //         res.json({"userId": result._id});
    // })

});

var upload = multer({
    storage: storage
}).single('file');

module.exports = router;
