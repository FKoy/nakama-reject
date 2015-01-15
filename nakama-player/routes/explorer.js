var express = require('express');
var router = express.Router();

/* GET explorer page. */
router.get('/', function(req, res) {

    var localFiles = require('./util/item_collect')();

    // Get files from server. If user not logging in, it return null

    require('./util/get_files')(res, localFiles);
    //console.log(cloudFiles);

});

module.exports = router;