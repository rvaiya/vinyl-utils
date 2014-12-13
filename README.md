#What

  - Various utility functions for dealing with vinyl file streams 

#Usage

	var vutil = require('vinyl-utils');

	vutil.collect(gulp.src('testing').pipe(inject))
		.then(function(files) { /* Do something */ });;

	gulp.src
		.pipe(vinyl.passiveStreamGenerator(function() {
			/* Do something */
		})());

