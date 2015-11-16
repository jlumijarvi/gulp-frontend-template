var gulp = require('gulp');
var config = require('../gulp.config')();
var utils = require('../gulp.utils')();

var $ = utils.plugins;

gulp.task('compress-release', function () {
    return gulp
        .src(config.release + '**/*.*')
        .pipe($.zip('release.zip'))
        .pipe(gulp.dest(config.build));
});

gulp.task('compress-debug', function () {
    return gulp
        .src(config.debug + '**/*.*')
        .pipe($.zip('debug.zip'))
        .pipe(gulp.dest(config.build));
});

gulp.task('compress', ['compress-release', 'compress-debug']);
