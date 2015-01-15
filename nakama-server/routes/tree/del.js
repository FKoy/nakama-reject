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
                tree = deleteFile(tree.tree, req.param('files'));
                tree.save(function (err) {
                    if (err) {
                        console.log(err);
                    }

                    res.send('OK');
                });
            });
        }
    });

    function deleteFile (tree, updatedFiles) {
        for (var i in updatedFiles) {

            for (var j in tree) {

                if (tree[j].path === updatedFiles[i]) {
                    delete tree[j];

                    if (tree[j].type === "folder" ) {

                        tree = deleteFile(tree, tree.files);

                    } else {

                        File.remove({ virtual_path : updatedFiles[i] },
                            function(err) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                    }
                }
            }
        }

        return tree;
    }
};