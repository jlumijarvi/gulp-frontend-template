var gulp = require('gulp');
var config = require('../gulp.config')();
var utils = require('../gulp.utils')();

gulp.task('markup', ['clean-markup'], function () {
    return gulp
        .src(config.src + 'app/**/*.html')
        .pipe(gulp.dest(config.debug + 'app/'));
});

gulp.task('clean-markup', function() {
    return utils.clean(config.debug + 'app/**/*.html');
});
