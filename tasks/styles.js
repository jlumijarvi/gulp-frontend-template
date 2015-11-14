var gulp = require('gulp');
var config = require('../gulp.config')();
var utils = require('../gulp.utils')();
var $ = utils.plugins;

gulp.task('styles', ['clean-styles'], function () {
    return gulp
        .src(config.src + 'styles/**/*.scss')
        .pipe($.plumber())
        .pipe($.sass.sync())
        .pipe($.autoprefixer())
        .pipe(gulp.dest(config.debug + 'styles/'))
});

gulp.task('clean-styles', function () {
    return utils.clean(config.debug + 'app/**/*.css');
});
