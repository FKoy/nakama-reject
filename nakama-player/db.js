var levelup = require('level');

var db = levelup('./ldb');

module.exports = db;