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
    var options = {
        read: false,
        addRootSlash: false
    };

    var wiredep = require('wiredep').stream;
    var wiredepOptions = {
        bowerJson: config.bower.json,
        directory: config.bower.directory,
        ignorePath: '../'
    };

    return gulp
        .src(config.src + config.index)
        .pipe($.inject(gulp.src(sources, { cwd: config.debug }), options))
        .pipe(wiredep(wiredepOptions))
        .pipe(gulp.dest(config.debug));
}

function watch(files, task) {
    return $.watch(files, $.batch(function (events, done) {
        gulp.start(task, done);
    }));
}

gulp.task('build', ['scripts', 'styles', 'templates', 'assets', 'other', 'bower'], function () {
    return inject();
});

gulp.task('other', function () {
    return gulp
        .src(config.src + 'lib/**/*.*')
        .pipe(gulp.dest(config.debug + 'lib/'));
});

gulp.task('bower', ['clean-bower'], function() {
    return gulp
        .src(config.bower.directory + '**/*.*')
        .pipe(gulp.dest(config.debug + 'bower_components'));
});

gulp.task('clean-bower', function() {
    return utils.clean(config.debug + 'bower_components');
});

gulp.task('inject', function () {
    return inject();
});

gulp.task('clean', function () {
    utils.log('Cleaning everything...')
    return utils.clean(config.build);
});

gulp.task('watch', function () {
    if (argv.r) {
        return;
    }
    
    watch(config.src + config.index, ['inject']);
    watch(config.src + config.favicon, ['favicon']);
    watch(config.src + config.templates, ['templates']);
    watch(config.src + config.ts, ['scripts']);
    watch(config.src + config.js, ['scripts']);
    watch(config.src + config.sass, ['styles']);
    watch(config.src + config.images, ['images']);
    watch(config.src + config.images, ['videos']);
});

// Static server
gulp.task('browser-sync', function () {

    var baseDir = argv.r ? './build/release/' : './build/debug/';
    
    var options = {
        server: {
            baseDir: baseDir
        },
        startPath: '/'
    };
    
    if (!argv.r) {
        options.files = [
            config.debug + '*.*', // index.html & favicon.ico
            config.debug + config.templates,
            config.debug + config.scripts,
            config.debug + config.styles,
            config.debug + config.images
        ];
        options.logLevel = 'debug';
        options.logPrefix = 'car-service-client';
        options.notify = true;
        options.reloadDelay = 1000;
    }

    browserSync.init(options);
});

gulp.task('start', ['browser-sync', 'watch']);

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);
