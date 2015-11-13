module.exports = function () {

	var $ = require('gulp-load-plugins')({ lazy: true });
	var del = require('del');

	var utils = {
		clean: clean,
		log: log,
		plugins: $,
		base: base
	};

	function clean(files) {
		return del(files);
	};

	function log(msg) {
		var color = $.util.colors.blue;
		$.util.log(color(msg));
	}

	function base(f) {
		return f.base;
	}

	return utils;
};
