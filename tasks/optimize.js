var gulp = require('gulp');
var config = require('../gulp.config')();
var utils = require('../gulp.utils')();
var $ = utils.plugins;

gulp.task('release', ['build', 'templatecache', 'clean-release'], function () {
    return gulp
        .src([
            config.debug + '**/*.*',
            '!' + config.debug + 'app/**/*.*',
            '!' + config.debug + 'styles/**/*.css',
            '!' + config.debug + 'bower_components/**/*.*'
        ])
        .pipe(gulp.dest(config.release));
});

gulp.task('clean-release', function () {
    return utils.clean(config.release);
});

gulp.task('optimize', ['build', 'release'], function () {

    // we need to inject the template cache
    var sources = [
        config.debug + 'app/app.js',
        config.debug + config.scripts,
        '../.tmp/templates.js'
    ];
    var options = {
        read: false,
        addRootSlash: false
    };

    return gulp
        .src(config.debug + config.index)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(sources, { cwd: config.debug }), options))
        .pipe($.useref())
        .pipe($.if('app/**/*.js', $.ngAnnotate()))
        .pipe($.if('**/*.js', $.uglify()))
        .pipe($.if('**/*.js', $.rev()))
        .pipe($.if('**/*.css', $.csso()))
        .pipe($.if('**/*.css', $.rev()))
        .pipe($.revReplace())
        .pipe($.if('**/*.html', $.minifyHtml()))
        .pipe(gulp.dest(config.release));
});

gulp.task('templatecache', ['templates', 'clean-templatecache'], function () {
    return gulp
        .src(config.debug + config.templates)
        .pipe($.minifyHtml())
        .pipe($.angularTemplatecache({ root: '/app/', standalone: true })) // templates.js
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean-templatecache', function () {
    return utils.clean(config.temp + 'templates.js');
});
