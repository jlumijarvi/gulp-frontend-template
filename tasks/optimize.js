var gulp = require('gulp');
var config = require('../gulp.config')();
var utils = require('../gulp.utils')();
var vinylPaths = require('vinyl-paths');
var $ = utils.plugins;

gulp.task('release', ['build', 'clean-release'], function() {
    var assets = [
        config.debug + '**/*.*',
        '!' + config.debug + 'app/**/*.*',
        '!' + config.debug + 'styles/**/*.*'
    ];
    return gulp
        .src(assets)
        .pipe(gulp.dest(config.release));
});

gulp.task('clean-release', function() {
    return utils.clean(config.release);
});

gulp.task('optimize', ['build', 'release'], function (done) {

    return gulp
        .src(config.debug + config.index)
        .pipe($.plumber())
        .pipe($.useref())
        .pipe($.if('**/*.js', vinylPaths(utils.clean)))
        .pipe($.if('**/*.js', $.uglify()))
        .pipe($.if('**/*.js', $.rev()))
        .pipe($.if('**/*.css', vinylPaths(utils.clean)))
        .pipe($.if('**/*.css', $.csso()))
        .pipe($.if('**/*.css', $.rev()))
        .pipe($.revReplace())
        .pipe($.minifyHtml())
        .pipe(gulp.dest(config.release));
});
