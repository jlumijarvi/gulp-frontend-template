var gulp = require('gulp');
var config = require('../gulp.config')();
var utils = require('../gulp.utils')();
var $ = utils.plugins;


var jsFilter = $.filter('**/*.js', { restore: true });
var tsFilter = $.filter('**/*.ts', { restore: true });

gulp.task('scripts', ['clean-scripts'], function () {
    return gulp
        .src(config.src + 'app/**/*.*')
        .pipe(jsFilter)
        .pipe(gulp.dest(config.debug + 'app/'))
        .pipe(jsFilter.restore)
        .pipe(tsFilter)
        .pipe($.plumber())
        .pipe($.typescript())
        .pipe(gulp.dest(config.debug + 'app/'))
});

gulp.task('clean-scripts', function () {
    return utils.clean(config.debug + 'app/**/*.js');
});
