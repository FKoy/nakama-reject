
var db = require('../../db');
var fs = require('fs');
var io = new require('socket.io-client');

var socket = io.connect('http://localhost:3335/');

var _res;

socket.on('response', function(msg) {

    console.log(msg);

    if (msg === 'OK') {
        _res.send('OK');
    }

});

function send (req, res) {
    _res = res;

    var cloudPath = req.param('cloudPath');
    var realPath = req.param('path');
    var name = req.param('path').split('/');
    name = name[name.length-1];

    db.get('hash', function(err, hash) {

        fs.readFile(realPath, function(err, buf){

            if( !/\/^/.test(cloudPath) ) {
                cloudPath += '/';
            }

            console.log(cloudPath + name);

            socket.emit('send', {
                    hash: hash,
                    name: cloudPath + name,
                    path: realPath,
                    buf: buf
                }
            );

        });

    });
}

module.exports = send;