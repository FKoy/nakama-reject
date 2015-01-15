var login = require('./util/login');

module.exports = function (req, res) {

    if (req.param('name') === undefined) {
        res.send('Error : please set \'name\' to query');
    }

    if (req.param('password') === undefined) {
        res.send('Error : please set \'password\' to query');
    }

    login(req, res);
};