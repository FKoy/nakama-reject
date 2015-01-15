var Tree = require('../../model').tree;
var LoginUser = require('../../model').loginUser;
var File = require('../../model').file;

module.exports = function (req, res) {

    if (req.param('hash') === undefined) {
        res.send('Error : must required hash.');
    }

    LoginUser.findOne( { hash : req.param('hash') }, function (err, user){
        if (err) {
            console.log(err);
        }

        if (user === null) {
            res.send('Error : please login.');
        } else {
            Tree.find({ id : user.id }, function (err, tree) {
                tree = updatePath(tree.tree, req.param('files'));
                tree.save(function (err) {
                    if (err) {
                        console.log(err);
                    }

                    res.send('OK');
                });
            });
        }
    });

    function updatePath (tree, updatedFiles) {
        for (var i in updatedFiles) {
            for (var j in tree) {
                if (tree[j].path === updatedFiles[i].before) {
                    tree[j].path = updatedFiles[i].after;

                    File.update({ virtual_path : updatedFiles[i].before },
                        { $set : { virtual_path : updatedFiles[i].after }},
                        function(err, file) {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
            }
        }

        return tree;
    }
};