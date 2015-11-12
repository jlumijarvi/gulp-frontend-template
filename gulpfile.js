var gulp = require('gulp');
var config = require('./gulp.config')();
var utils = require('./gulp.utils')();
var browserSync = require('browser-sync');
var requireDir = require('require-dir');

var $ = utils.plugins;
var tasks = requireDir('./tasks');

gulp.task('build', ['typescript', 'styles', 'html', 'images']);

gulp.task('clean', function () {
    utils.log('Cleaning everything...')
    return utils.clean(config.build);
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/app/**/*.ts', ['typescript']);
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/images/**/*.*', ['images']);
});

// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: './build/',
        files: [
            config.build + '**/*.html',
            config.build + 'styles/**/*.css',
            config.build + 'app/**/*.js',
            config.build + 'images/**/*.*'
        ]
    });
});

gulp.task('help', $.taskListing);
gulp.task('default', ['build', 'browser-sync', 'watch']);
