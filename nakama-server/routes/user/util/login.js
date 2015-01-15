module.exports = function login(req, res) {

    var modelDir = '../../../model';

    var User = require(modelDir).user;
    var LoginUser = require(modelDir).loginUser;
    var uuid = require('node-uuid');

    User.findOne({ name : req.param('name') }, function (err, user) {

        if (user === null) {
            res.send('NOT_EXIST_USER');
            return;
        }

        if (user.password === req.param('password')) {

            LoginUser.findOne({ id : user._id }, function(err, loginUser) {
                if (loginUser !== null) {
                    res.send('ALREADY');
                    return;
                }

                if (err) {
                    console.log(err);
                    res.send('SERVER_ERROR');
                    return;
                }

                var hash = uuid.v1();

                var loginUser = new LoginUser();

                loginUser.id = user._id;
                loginUser.hash = hash;
                loginUser.save(function (err) {
                    if (err) {
                        console.log(err);
                    }

                    console.log(hash);
                    res.send(hash);

                });
            });

        } else {
            res.send('MISSING_PASSWORD');
            return;
        }
    });
}