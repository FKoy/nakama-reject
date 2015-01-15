var router = require('express').Router();

var get = require('./get');
var update = require('./update');
var del = require('./del');
var insert = require('./insert');

router.get('/',get);
router.put('/update', update);
router.delete('/delete', del);
router.post('/insert', insert);

module.exports = router;