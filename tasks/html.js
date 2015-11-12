var gulp = require('gulp');
var config = require('../gulp.config')();
var utils = require('../gulp.utils')();

gulp.task('html', ['clean-html'], function () {
    return gulp
        .src([config.src + '**/*.html', config.src + 'favicon.ico'])
        .pipe(gulp.dest(config.build));
});

gulp.task('clean-html', function() {
    return utils.clean([config.build + '**/*.html', config.build + 'favicon.ico']);
});
