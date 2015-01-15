
var fs = require('fs');
var home_dir = require('../../home_dir');

/*
This module return all file names of directory.

@param  {path}  Basis path
@return {files} All file names

*/

module.exports = function (path) {


    if (path === undefined) {
        var path = home_dir;
    }

    var result = [];

    var files = fs.readdirSync(path).filter(isNotHiddenFile);

    files.forEach(addFileType);

    result = result.sort(
        function comp (v1, v2) {
            if (v1.type < v2.type) return -1;
            if (v1.type > v2.type) return 1;
            return 0;
        }
    );

    return result;


    function isNotHiddenFile (fileName) {

        // If top of a file name is '.', skip it.
        if (! /^\./.test(fileName)) return fileName;
    }


    function addFileType (fileName) {

        // If end of base path is not closed at '/', it add '/' to end.
        path = /\/$/.test(path) ? path : path + '/';

        var stat = fs.lstatSync(path + fileName);

        if (stat.isFile()) {
            var type = 'file';
        } else if (stat.isDirectory()) {
            var type = 'folder';
        } else {
            return;
        }

        result.push({
            name : fileName,
            type : type,
            path : path + fileName
        });

    }


};



