/**
 * Created by koya on 15/01/02.
 */

module.exports = function (req, res) {

    if (req.param('hash') === undefined) {
        res.send('Error : hash is must required');
        return;
    }

    var LoginUser = require('../../model').loginUser;

    LoginUser.remove({ hash : req.param('hash') }, function (err) {
        if (err) {
            console.log(err);
        }
        res.send('OK');
    });

};