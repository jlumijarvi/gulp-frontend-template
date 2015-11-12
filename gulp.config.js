module.exports = function () {

	var del = require('del');

    var config = {
		root: __dirname,
		build: __dirname + '/build/',
		src: __dirname + '/src/'
	};

	config.clean = function (files) {
		return del(files);
	};

	config.log = function (msg) {
		var color = $.util.colors.blue;
		$.util.log(color(msg));
	}

	return config;
}
