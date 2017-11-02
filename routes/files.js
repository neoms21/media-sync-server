var express = require('express');
var router = express.Router();
var config = require('../config/config');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
router.post('/arrange', function (req, res, next) {
    console.log(config, req.body);
    var dir = config.uploadDir + '/' + req.body.folder;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    var numberOfFiles = req.body.files.length;
    var counter = 0;
    _.each(req.body.files, function (f) {

        var source = fs.createReadStream(config.uploadDir + '/' + f);
        var dest = fs.createWriteStream(config.uploadDir + '/' + req.body.folder + '/' + f);

        source.pipe(dest);
        source.on('end', function () {
            if (++counter === numberOfFiles) {
                res.json('success');
                console.log('done')
            }

        });
        source.on('error', function (err) { /* error */
        });
    });

}, function (err) {
    console.log(err);
});


module.exports = router;
