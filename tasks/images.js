var gulp = require('gulp');
var config = require('../gulp.config')();
var utils = require('../gulp.utils')();

gulp.task('images', ['clean-images'], function () {
    return gulp
        .src(config.src + 'images/**/*.*')
        .pipe(gulp.dest(config.debug + 'images/'));
});

gulp.task('clean-images', function () {
    return utils.clean(config.debug + 'images/**/*.*');
});
