var gulp = require('gulp');
var config = require('../gulp.config')();
var utils = require('../gulp.utils')();
var $ = utils.plugins;

gulp.task('scripts', ['clean-scripts'], function () {
    var jsFilter = $.filter('**/*.js', { restore: true });
    var tsFilter = $.filter('**/*.ts', { restore: true });

    return gulp
        .src(config.src + 'app/**/*.*')
        .pipe($.plumber())
        .pipe(jsFilter)
        .pipe(gulp.dest(config.debug + 'app/'))
        .pipe(jsFilter.restore)
        .pipe(tsFilter)
        .pipe($.typescript())
        .pipe(gulp.dest(config.debug + 'app/'))
});

gulp.task('clean-scripts', function () {
    return utils.clean(config.debug + 'app/**/*.js');
});
