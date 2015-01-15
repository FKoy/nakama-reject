var Tree = require('../../../model').tree;

module.exports = function (virtualPath, owner) {
    Tree.findOne({id : owner}, function(err, tree_) {
        if (err) {
            console.log(err);
        }
        if (tree_ === null) {
            console.log('Tree not found from '+owner);
        }

        var tree = JSON.parse(tree_.tree);

        var tmp = virtualPath.split('/');
        var pathTo = tmp.slice(0, tmp.length-1).join('/');
        var fileName = tmp[tmp.length-1];

        for (var i in tree) {
            if (tree[i].path === pathTo) {
                tree[i].files.push(fileName);
            }
        }

        tree.push({
            "type" : "file",
            "path" : virtualPath,
            "name" : fileName
        });

        tree_.tree = JSON.stringify(tree);

        tree_.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('insertion success');
            }
        })
    });
};