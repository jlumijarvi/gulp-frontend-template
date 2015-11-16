var gulp = require('gulp');
var config = require('./gulp.config')();
var utils = require('./gulp.utils')();
var browserSync = require('browser-sync');
var requireDir = require('require-dir');
var argv = require('yargs').argv;

var $ = utils.plugins;
var tasks = requireDir('./tasks');

function inject() {
    var sources = [
        config.debug + config.styles,
        config.debug + 'app/app.js',
        config.debug + config.scripts
    ];

    var wiredep = require('wiredep').stream;
    var options = {
        bowerJson: config.bower.json,
        directory: config.bower.directory
    };

    return gulp
        .src(config.src + config.index)
        .pipe($.inject(gulp.src(sources, { cwd: config.debug }), { read: false, addRootSlash: false }))
        .pipe(wiredep(options))
        .pipe(gulp.dest(config.debug));
}

function watch(files, task) {
    return $.watch(files, $.batch(function (events, done) {
        gulp.start(task, done);
    }));
}

gulp.task('build', ['scripts', 'styles', 'assets', 'other'], function () {
    return inject();
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
    watch(config.src + config.index, ['inject']);
    watch(config.src + config.favicon, ['favicon']);
    watch(config.src + config.markup, ['markup']);
    watch(config.src + config.ts, ['scripts']);
    watch(config.src + config.js, ['scripts']);
    watch(config.src + config.sass, ['styles']);
    watch(config.src + config.images, ['images']);
    watch(config.src + config.images, ['videos']);
});

// Static server
gulp.task('browser-sync', function () {

    var baseDir = './build/debug/';
    var watchDir = config.debug;

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
