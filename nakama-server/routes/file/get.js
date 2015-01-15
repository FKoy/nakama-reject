var LoginUser = require('../../model').loginUser;
var File = require('../../model').file;
var fileType = require('file-type');
var fs = require('fs');

module.exports = function (req, res) {

    var hash = req.param('hash');
    var fileName = req.param('file');

    if (hash === undefined || fileName === undefined) {
        res.send('PARAM_ERROR');
        return;
    }

    verifyLogined(hash, fileName, res);


    function verifyLogined(hash, fileName, res){

        LoginUser.find({hash : hash}, function (err, user) {
            if (err) {
                console.log(err);
                res.send('SERVER_ERROR');
                return;
            }

            if (user === null) {
                console.log(err);
                res.send('AUTH_ERROR');
                return;
            }

            findFile(user.id, fileName);
        });

    }

    function findFile (id, fileName, res) {

        File.findOne({ $and : [
            { id : id },
            { virtual_path : fileName }
        ]}, function(err, file) {
            if (err) {
                console.log(err);
                res.send('SERVER_ERROR');
                return;
            }

            var name = file.virtual_path.split('/');
            name = name[name.length - 1];
            var hash = file.hash;

            sendFile(hash, name);
        });

    }


    function sendFile (hash, name, res) {

        fs.readFile('../../../uploads/'+hash, function(err, buf) {
            if (err) {
                console.log(err);
                res.send('SERVER_ERROR');
                return;
            }

            var type = fileType(buf).ext.split('/');
            type = type[type.length - 1];

            res.json({
                type : type,
                buf : buf,
                name : name
            })
        });

    }
};