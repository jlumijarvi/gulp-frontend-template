module.exports = function () {

    var config = {
		root: __dirname,
		build: __dirname + '/build/',
		src: __dirname + '/src/',
		index: 'index.html',
		markup: 'app/**/*.html',
		ts: 'app/**/*.ts',
		scripts: 'app/**/*.js',
		sass: 'styles/**/*.scss',
		styles: 'styles/**/*.css',
		images: 'images/**/*.*'
	};

	return config;
};
