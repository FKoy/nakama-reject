var fs = require('fs');
var fileType = require('file-type');

module.exports = function (req, res) {

    var path = req.param('path');

    if (path === undefined) {
        console.log('Error : path is not defined');
        return;
    }

    sendFile(path, res);


    function sendFile (path, res) {
        fs.readFile(path, function (err, buf) {
            if (err) {
                console.log(err);
                res.send('SERVER_ERROR');
                return;
            }

            var type = fileType(new Uint8Array(buf));

            if (type === null) {
                res.json({
                    type : 'text/',
                    buf : buf.toString('utf-8'),
                    path : path
                });
                return;
            }

            res.json({
                type : type.mime,
                buf : buf,
                path : path
            });

        });
    }
};