var express = require('express');
var path = require('path');
var flash = require('connect-flash');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var top = require('./routes/top');
var explorer = require('./routes/explorer');
var tutorial = require('./routes/tutorial');
var user = require('./routes/user');
var file = require('./routes/file');
var tree = require('./routes/tree');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('aaaaaaiiiiiddddddd'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session());
app.use(flash());

app.use('/', explorer);
app.use('/file', file);
app.use('/top', top);
app.use('/tutorial', tutorial);
app.use('/user', user);
app.get('/tree', tree);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
