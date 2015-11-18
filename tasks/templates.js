var gulp = require('gulp');
var config = require('../gulp.config')();
var utils = require('../gulp.utils')();

gulp.task('templates', ['clean-templates'], function () {
    return gulp
        .src(config.src + config.templates)
        .pipe(gulp.dest(config.debug + 'app/'));
});

gulp.task('clean-templates', function() {
    return utils.clean(config.debug + config.templates);
});
