var gulp = require('gulp');
var config = require('../gulp.config')();
var utils = require('../gulp.utils')();
var $ = utils.plugins;

gulp.task('typescript', ['clean-typescript'], function () {
    return gulp
        .src(config.src + 'app/**/*.ts')
        .pipe($.plumber())
        .pipe($.typescript())
        .pipe(gulp.dest(config.build + 'app/'))
});

gulp.task('clean-typescript', function () {
    return utils.clean(config.build + 'app/**/*.js');
});
