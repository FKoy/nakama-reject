var Tree = require('../../model').tree;
var LoginUser = require('../../model').loginUser;

module.exports = function (req, res) {
    if (req.param('hash') === undefined) {
        res.send('Error : required hash');
    }

    LoginUser.findOne({ hash : req.param('hash')}, function (err, user) {
        if (err) {
            console.log(err);
        }

        if (user === null) {
            res.send('Error : Please login at first');
            return;
        }

        Tree.findOne({ id : user.id }, function (err, tree) {
            res.json(tree.tree);
        });
    });


};