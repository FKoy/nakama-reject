var login = require('./util/login');
var stringify = require('stringify-object');

module.exports = function (req, res) {
    var User = require('../../model').user;
    var Tree = require('../../model').tree;

    console.log(req);

    var name = req.param('name');
    var password = req.param('password');

    //validation
    if (name === undefined) {
        res.send('Error : please set \'name\' to query');
        return;
    } else if (password === undefined) {
        res.send('Error : please set \'password\' to query');
        return;
    } else {

        User.findOne( { name : name }, function (err, user) {
            if (user !== null) {
                res.send('EXIST');
                return;
            }

            var newUser = new User();
            newUser.name = name;
            newUser.password = password;
            newUser.save(function (err) {

                if (err) {
                    console.log(err);
                }

                login(req, res);

                var tree = new Tree();
                User.findOne({ name : req.param('name') }, function (err, user) {

                    if (err) {
                        console.log(err);
                    }

                    tree.id = user._id;

                    tree.tree = JSON.stringify([
                            {
                                "type" : "folder",
                                "path" : "/",
                                "name" : "root",
                                "files" : [
                                    "images",
                                    "sample.txt"
                                ]
                            },
                            {
                                "type" : "folder",
                                "path" : "/images",
                                "name" : "images",
                                "files" : [
                                    "sample.png"
                                ]
                            },
                            {
                                "type" : "file",
                                "path" : "/images/sample.png",
                                "name" : "sample.png"
                            },
                            {
                                "type" : "file",
                                "path" : "/sample.txt",
                                "name" : "sample.txt"
                            }
                        ]);
                    tree.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                });

            });
        });
    }
    return;
};
