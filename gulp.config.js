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
		less: 'styles/**/*.less',
		sass: 'styles/**/*.scss',
		styles: 'styles/**/*.css',
		images: 'images/**/*.*',
		videos: 'videos/**/*.*',
		bower: {
			json: require(__dirname + '/bower.json'),
			directory: __dirname + '/bower_components/'
		}
	};

	return config;
};
