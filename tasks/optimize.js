var gulp = require('gulp');
var config = require('../gulp.config')();
var utils = require('../gulp.utils')();
var $ = utils.plugins;

gulp.task('release', ['build', 'clean-release'], function() {
    return gulp
        .src([
            config.debug + '**/*.*',
            '!' + config.debug + 'app/**/*.js',
            '!' + config.debug + 'styles/**/*.css',
            '!' + config.debug + 'bower_components/**/*.*'
        ])
        .pipe(gulp.dest(config.release));
});

gulp.task('clean-release', function() {
    return utils.clean(config.release);
});

gulp.task('optimize', ['build', 'release'], function () {
    
    return gulp
        .src(config.debug + config.index)
        .pipe($.plumber())
        .pipe($.useref())
        .pipe($.if('app/**/*.js', $.ngAnnotate()))
        .pipe($.if('**/*.js', $.uglify()))
        .pipe($.if('**/*.js', $.rev()))
        .pipe($.if('**/*.css', $.csso()))
        .pipe($.if('**/*.css', $.rev()))
        .pipe($.revReplace())
        .pipe($.if('**/*.html', $.minifyHtml()))
        .pipe(gulp.dest(config.release));
});
