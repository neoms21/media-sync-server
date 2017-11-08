var express = require('express');
var router = express.Router();
var config = require('../config/config');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var uploadDir = config.uploadDir;
router.post('/arrange', function (req, res, next) {


    var dir = uploadDir + '/' + req.body.folder;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    var numberOfFiles = req.body.files.length;
    var counter = 0;
    _.each(req.body.files, function (f) {

        var source = fs.createReadStream(uploadDir + '/' + f);
        var dest = fs.createWriteStream(uploadDir + '/' + req.body.folder + '/' + f);

        source.pipe(dest);
        source.on('end', function (x) {

            if (++counter === numberOfFiles) {
                res.json('success');
                deleteFiles(uploadDir);
            }
        });
        source.on('error', function (err) { /* error */
        });
    });

}, function (err) {
    console.log(err);
});

var deleteFiles = function(dirPath) {
    try { var files = fs.readdirSync(dirPath); }
    catch(e) { return; }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);

        }
};


module.exports = router;
