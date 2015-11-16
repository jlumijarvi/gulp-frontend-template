module.exports = function () {

	var build = __dirname + '/build/';

    var config = {
		root: __dirname,
		build: build,
		debug: build + 'debug/',
		release: build + 'release/',
		src: __dirname + '/src/',
		index: 'index.html',
		favicon: 'favicon.ico',
		markup: 'app/**/*.html',
		ts: 'app/**/*.ts',
		js: 'app/**/*.js',
		scripts: 'app/**/*.js',
		sass: 'styles/**/*.scss',
		styles: 'styles/**/*.css',
		images: 'images/**/*.*',
		videos: 'videos/**/*.*'
	};

	return config;
};
