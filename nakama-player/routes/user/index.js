var express = require('express');
var router = express.Router();

var login = require('./login');
var signup = require('./signup');

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;