var express = require('express');
var router = express.Router();

var post = require('./post');
var cloud = require('./cloud');
var local = require('./local');

router.post('/post', post);
router.get('/cloud', cloud);
router.get('/local', local);

module.exports = router;