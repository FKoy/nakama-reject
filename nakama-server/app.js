var https = require('https');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

var ssl_server_key = './decrypt_server.key';
var ssl_server_crt = './server.crt';
var port = 3334;

var options = {
    key: fs.readFileSync(ssl_server_key),
    cert: fs.readFileSync(ssl_server_crt)
};

app.set('view options', { layout: false });
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', require('./routes/user'));
app.use('/tree', require('./routes/tree'));
//app.use('/file', require('./routes/file'));

require('./routes/file/post');

var server = https.createServer(options, app).listen(port);
//http.createServer(app).listen(port);

module.exports = server;