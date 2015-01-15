var LESS_DIR = 'public/less';
var CSS_DIR = 'public/stylesheets';

var path = require('path');

var gulp = require('gulp');
var logger = require('gulp-logger');
var watch = require('gulp-watch');
var lessDependents = require('gulp-less-dependents');
var filter = require('gulp-filter');
var lessc = require('gulp-less');

gulp.task('less', function() {
    gulp.src(path.join(LESS_DIR, '**/*.less'), { base: LESS_DIR })
        .pipe(watch(path.join(LESS_DIR, '**/*.less')))
        .pipe(lessDependents())
        .pipe(filter([ '*', '!**/_*.less' ]))
        .pipe(lessc())
        .pipe(gulp.dest(CSS_DIR))
        .pipe(logger({ beforeEach: '[less] wrote: ' }));
});