var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nakama');

var UserSchema = new mongoose.Schema({
    name :      { type : String, required : true },
    password :  { type : String, required : true },
    last_login :    Date
});

var LoginUserSchema = new mongoose.Schema({
    id : { type : String, required : true },
    hash : { type : String, required : true }
});

var PathTreeSchema = new mongoose.Schema({
    id : { type : String, required : true },
    tree : { type : String, required : true }
});

var FileSchema = mongoose.Schema({
    owner: { type : String, required : true },
    virtual_path : { type : String, required : true },
    hash : { type : String, required : true }
});

mongoose.model('User', UserSchema);
mongoose.model('LoginUser', LoginUserSchema);
mongoose.model('PathTree', PathTreeSchema);
mongoose.model('File', FileSchema);

module.exports.user = mongoose.model('User');
module.exports.loginUser = mongoose.model('LoginUser');
module.exports.tree = mongoose.model('PathTree');
module.exports.file = mongoose.model('File');