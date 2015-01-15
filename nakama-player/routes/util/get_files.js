var db = require('../../db');
var https = require('https');
var serverHost = require('../../server_host');
var request = require('request');
var homePath = require('../../home_dir');

//db.del('hash', function () {

module.exports = function (res, localFiles) {
    db.get('hash', function (err, hash) {
        if (err) {
            console.log(err);
        }

        if (!hash) {
            module.exports = undefined;
            return;
        }

        var form = {
            hash : hash
        };

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        request.get('https://'+serverHost+':3334/tree/', {form : form, json: true}, function (error, response, body){
            if (error) {
                console.log(error);
            }

            res.render('explorer', {
                localFiles : localFiles,
                cloudFiles : JSON.parse(body),
                homePath : homePath
            });

        });

    });
};


//});

