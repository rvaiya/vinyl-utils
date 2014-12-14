#What

  - Various utility functions for dealing with vinyl file streams 

#Usage

```javascript
  var vutil = require('vinyl-utils');
  var sass = require('gulp-sass');
  var minify = require('gulp-minify');

  vutil.collect(gulp.src('testing').pipe(inject))
    .then(function(files) { /* Do something */ });;

  gulp.src('input/*')
    .pipe(vutil.sideeffect(function(file) {
      console.log(file.path);
    })())
	.pipe(vutil.drain());

  gulp.src('sass/*')
    .pipe(vutil.createPipeline(sass, minify))
    .pipe(gulp.dest('output'));
```
