var express = require('express');
var router = express.Router();

/* GET top page. */
router.get('/', function(req, res) {
  res.render('top', { title: 'Express' });
});

module.exports = router;

