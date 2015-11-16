var gulp = require('gulp');
var config = require('../gulp.config')();
var utils = require('../gulp.utils')();
var $ = utils.plugins;

/**
 * Compile less and sass to css
 * @return {Stream}
 */
gulp.task('styles', ['clean-styles'], function () {
    return gulp
        .src([config.src + config.less, config.src + config.sass])
        .pipe($.plumber())
        .pipe($.if('**/*.less', $.less()))
        .pipe($.if('**/*.scss', $.sass()))
        .pipe($.autoprefixer())
        .pipe(gulp.dest(config.debug + 'styles/'));
});

/**
 * Remove all styles from the debug build folder
 * @param  {Function} cb - callback when complete
 */
gulp.task('clean-styles', function () {
    return utils.clean(config.debug + config.styles);
});
