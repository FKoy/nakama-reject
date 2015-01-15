var https = require('https');
var request = require('request');
var SERVER_Host = require('../../server_host');
var db = require('../../db');

module.exports = function (req, res) {

    if (req.param('name') === undefined) {
        req.flash('message', 'Please input username');
        req.redirect('/');
    } else if (req.param('password') === undefined) {
        req.flash('message', 'Please input password');
        req.redirect('/');
    } else {
        login(res);
    }

    function login (res) {

        var form = {
            name : req.param('name'),
            password : req.param('password')
        };

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        request.post('https://'+SERVER_Host+':3334/user/signup', {form : form}, function (error, response, body){
            if (error) {
                console.log(error);
            }

            saveHash(body);
            res.redirect('/');
        });
    }

    function saveHash (hash) {
        db.put('hash', hash, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
};