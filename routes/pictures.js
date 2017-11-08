var config = require('../config/config');
var express = require('express');
var router = express.Router();
// var userModel = require('../mongoose').model("User");
var multer = require('multer');


var storage = multer.diskStorage({ //multers disk storage settings

    destination: function (req, file, cb) {
        cb(null, config.uploadDir);
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname)
    }
});

router.post('/save', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            res.json({error_code: 1, err_desc: err});
            return;
        }
        res.json({error_code: 0, err_desc: null});
    });
});

var upload = multer({
    storage: storage
}).single('file');

module.exports = router;
