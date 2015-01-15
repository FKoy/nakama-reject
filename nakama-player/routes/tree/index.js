module.exports = function (req, res) {
    if (req.param('path') === undefined) {
        res.send('PARAM_ERROR');
        return;
    }
    var path = req.param('path');

    var files = require('../util/item_collect')(path);

    res.json(files);
};