var Tree = require('../../model').tree;
var LoginUser = require('../../model').loginUser;

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

            Tree.findOne({ id : user.id }, function (err, tree) {
                tree = insertFile(tree.tree, req.param('file'));
                tree.save(function (err) {
                    if (err) {
                        console.log(err);
                    }

                    res.send('OK');

                });
            });
        }
    });

    function insertFile(tree, insertFile) {

        var insertFile = JSON.parse(insertFile);
        var tree = JSON.parse(tree);

        var isExisted = false;

        if (insertFile instanceof Array) {

            for (var i in insertFile) {
                for (var j in tree) {
                    if (tree[j].name === insertFile[i].name) {
                        isExisted = true;
                    }
                    if (isExisted) {
                        break;
                    }
                    if (j === tree.length - 1) {
                        tree.push(insertFile[i]);
                    }
                }
            }

            for (var i in insertFile) {
                var path = insertFile[i].path.split('/');
                var path = path.slice(0, path.length - 1).join('/');
                for (var j in tree) {
                    if (path === tree[j].path) {
                        tree[j].files.push(insertFile[i]);
                    }
                }

            }

        } else {

            for (var i in tree) {
                if (tree[i].name === insertFile.name) {
                    isExisted = true;
                }
                if (i === tree.length - 1) {
                    tree.push(insertFile);
                }
            }

            for (var i in tree) {
                if (path === tree[j].path) {
                    tree[j].files.push(insertFile);
                }
            }
        }

        return tree;
    }
};