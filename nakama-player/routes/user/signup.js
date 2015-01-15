var request = require('request');
var serverHost = require('../../server_host');
var db = require('../../db');

module.exports = function (req, res) {

    if (req.param('name') === undefined) {
        req.flash('message', 'Please input username');
        res.redirect('/');
    } else if (req.param('password') === undefined) {
        req.flash('message', 'Please input password');
        res.redirect('/');
    } else if (req.param('password') !== req.param('confirm')) {
        req.flash('message', 'Password does not match with Confirm');
        res.redirect('/');
    } else {
        var options = {
            hostname : serverHost,
            port : 3334,
            path : '/user/signup',
            method : 'POST',
            rejectUnauthorized: false,
            requestCert: true,
            agent: false
        };

        signup(res);
    }

    function signup (res) {

        var form = {
            name : req.param('name'),
            password : req.param('password')
        };

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        request.post('https://'+serverHost+':3334/user/signup', {form : form}, function (error, response, body){
            if (error) {
                console.log(error);
            }
            var hash = body;

            console.log('signup ok: hash = '+hash);

            saveHash(hash);

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