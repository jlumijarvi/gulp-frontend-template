var gulp = require('gulp');
var config = require('../gulp.config')();
var utils = require('../gulp.utils')();

gulp.task('assets', ['favicon', 'images', 'videos'])

gulp.task('images', ['clean-images'], function () {
    return gulp
        .src(config.src + config.images)
        .pipe(gulp.dest(config.debug + 'images/'));
});

gulp.task('clean-images', function () {
    return utils.clean(config.debug + config.images);
});

gulp.task('videos', ['clean-videos'], function () {
    return gulp
        .src(config.src + config.videos)
        .pipe(gulp.dest(config.debug + 'videos/'));
});

gulp.task('clean-videos', function () {
    return utils.clean(config.debug + config.videos);
});

gulp.task('favicon', function () {
    return gulp
        .src(config.src + config.favicon)
        .pipe(gulp.dest(config.debug));
});

