var File = require('../../model').file;
var LoginUser = require('../../model').loginUser;

var insertFile = require('./util/insert_file');

var path = require('path');
var uuid = require('node-uuid');
var fs = require('fs');

var io = require('socket.io').listen(3335);

io.on('connection', function (socket) {

    socket.on('send', receive);

    function receive(file) {
        console.log('receive');

        if (file === undefined)
            return;

        var hash = file.hash;

        LoginUser.findOne({hash: hash}, loginUser.bind(this, file));

        function loginUser(file, err, user) {

            if (err) {
                //res.send('SERVER_ERROR');
                console.log(err);
                socket.emit('response', 'SERVER_ERROR');
                return;
            }

            if (user === null) {
                //res.send('AUTH_ERROR');
                console.log('AUTH_ERROR');
                socket.emit('response', 'AUTH_ERROR');
                return;
            }

            var real_path = uuid.v4();

            fs.writeFile(path.join(__dirname, '../../', '/uploads', real_path), file.buf, writeFile.bind(this, file, user, real_path));

            return;

        }

        function writeFile(file, user, real_path, err) {

            if (err) {

                console.log('File could not be saved: ' + err);
                socket.emit('response', 'SERVER_ERROR');

            } else {

                var newFile = new File();
                newFile.owner = user.id;
                newFile.virtual_path = file.name;
                newFile.hash = real_path;

                newFile.save(function (err) {
                    if (err) {
                        //res.send('SERVER_ERROR');
                        console.log(err);
                    } else {
                        console.log('File ' + file.name + " saved");
                        socket.emit('response', 'OK');
                    }
                });

                insertFile(newFile.virtual_path, newFile.owner);

                return;
            }
        }
    }
});
