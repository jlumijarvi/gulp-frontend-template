var gulp = require('gulp');
var config = require('./gulp.config')();
var utils = require('./gulp.utils')();
var browserSync = require('browser-sync');
var requireDir = require('require-dir');

var $ = utils.plugins;
var tasks = requireDir('./tasks');

function inject() {
    var sources = [config.build + config.styles, config.build + config.scripts];
    return gulp
        .src(config.src + config.index)
        .pipe($.inject(gulp.src(sources, { cwd: config.build }), { read: false, addRootSlash: false }))
        .pipe($.minifyHtml({empty: true}))
        .pipe(gulp.dest(config.build));
}

gulp.task('build', ['typescript', 'styles', 'images', 'favicon', 'other'], function () {
    return inject();
});

gulp.task('favicon', function() {
    return gulp
        .src(config.src + 'favicon.ico')
        .pipe(gulp.dest(config.build));
});

gulp.task('other', function () {
    return gulp
        .src(config.src + 'lib/**/*.*')
        .pipe(gulp.dest(config.build + 'lib/'));
});

gulp.task('inject', function() {
    return inject();
});

gulp.task('clean', function () {
    utils.log('Cleaning everything...')
    return utils.clean(config.build);
});

gulp.task('watch', function () {
    gulp.watch(config.src + config.index, ['inject']);
    gulp.watch(config.src + 'favicon.ico', ['favicon']);
    gulp.watch(config.src + config.markup, ['markup']);
    gulp.watch(config.src + config.ts, ['typescript']);
    gulp.watch(config.src + config.sass, ['styles']);
    gulp.watch(config.src + config.images, ['images']);
});

// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './build/'
        },
        startPath: '/',
        files: [
            config.build + '*.*',
            config.build + config.markup,
            config.build + config.scripts,
            config.build + config.styles,
            config.build + config.images
        ]
    });
});

gulp.task('help', $.taskListing);
gulp.task('default', ['build', 'browser-sync', 'watch']);
