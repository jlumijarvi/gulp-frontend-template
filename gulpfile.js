var gulp = require('gulp');
var config = require('./gulp.config')();
var utils = require('./gulp.utils')();
var browserSync = require('browser-sync');
var requireDir = require('require-dir');
var argv = require('yargs').argv;

var $ = utils.plugins;
var tasks = requireDir('./tasks');

function inject() {
    var sources = [config.debug + config.styles, config.debug + config.scripts];
    return gulp
        .src(config.src + config.index)
        .pipe($.inject(gulp.src(sources, { cwd: config.debug }), { read: false, addRootSlash: false }))
        .pipe(gulp.dest(config.debug));
}

gulp.task('build', ['scripts', 'styles', 'images', 'favicon', 'other'], function () {
    return inject();
});

gulp.task('favicon', function () {
    return gulp
        .src(config.src + config.favicon)
        .pipe(gulp.dest(config.debug));
});

gulp.task('other', function () {
    return gulp
        .src(config.src + 'lib/**/*.*')
        .pipe(gulp.dest(config.debug + 'lib/'));
});

gulp.task('inject', function () {
    return inject();
});

gulp.task('clean', function () {
    utils.log('Cleaning everything...')
    return utils.clean(config.build);
});

gulp.task('watch', function () {
    gulp.watch(config.src + config.index, ['inject']);
    gulp.watch(config.src + config.favicon, ['favicon']);
    gulp.watch(config.src + config.markup, ['markup']);
    gulp.watch(config.src + config.ts, ['scripts']);
    gulp.watch(config.src + config.js, ['scripts']);
    gulp.watch(config.src + config.sass, ['styles']);
    gulp.watch(config.src + config.images, ['images']);
});

// Static server
gulp.task('browser-sync', function () {
    
    var baseDir = argv.r ? './build/release/' : './build/debug/';
    var watchDir = argv.r ? config.release : config.debug;
    
    browserSync.init({
        server: {
            baseDir: baseDir
        },
        startPath: '/',
        files: [
            watchDir + '*.*', // index.html & favicon.ico
            watchDir + config.markup,
            watchDir + config.scripts,
            watchDir + config.styles,
            watchDir + config.images
        ]
    });
});

gulp.task('start', ['browser-sync', 'watch']);

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);
