var gulp = require('gulp');
var config = require('../gulp.config')();
var utils = require('../gulp.utils')();
var vinylPaths = require('vinyl-paths');
var $ = utils.plugins;

gulp.task('optimize', ['build'], function () {

    var cssFilter = $.filter('**/*.css', { restore: true });
    var jsFilter = $.filter('**/*.js', { restore: true });
    return gulp
        .src(config.build + '**/*.*')
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(vinylPaths(utils.clean))
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(utils.base))
        .pipe(cssFilter.restore)
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(vinylPaths(utils.clean))
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(utils.base));
});
