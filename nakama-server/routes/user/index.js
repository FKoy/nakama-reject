var router = require('express').Router();

var login = require('./login');
var signup = require('./signup');
var logout = require('./logout');

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

module.exports = router;