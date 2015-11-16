var gulp = require('gulp');
var config = require('../gulp.config')();
var utils = require('../gulp.utils')();
var vinylPaths = require('vinyl-paths');
var $ = utils.plugins;

gulp.task('release', ['build', 'clean-release'], function() {
    return gulp
        .src(config.debug + '**/*.*')
        .pipe(gulp.dest(config.release));
});

gulp.task('clean-release', function() {
    return utils.clean(config.release);
});

gulp.task('optimize', ['build', 'release'], function () {
    
    var deleted = [
        config.release + 'app/',
        config.release + 'styles/'
    ];
    utils.cleanSync(deleted);
    
    return gulp
        .src(config.debug + config.index)
        .pipe($.plumber())
        .pipe($.useref())
        .pipe($.if('**/*.js', $.uglify()))
        .pipe($.if('**/*.js', $.rev()))
        .pipe($.if('**/*.css', $.csso()))
        .pipe($.if('**/*.css', $.rev()))
        .pipe($.revReplace())
        .pipe($.minifyHtml())
        .pipe(gulp.dest(config.release));
});
