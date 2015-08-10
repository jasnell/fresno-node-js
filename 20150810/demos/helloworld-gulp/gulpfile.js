var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

gulp.task('default', function() {
	return gulp.src(['test/*.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec',
      globals: {
        chai: require('chai')
      }
    }));
});

gulp.task('istanbul', function(cb) {
    gulp.src(['app.js', 'formatter.js'])
        .pipe(istanbul()) // Covering files
        .pipe(istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', function () {
          gulp.src(['test/*.js'])
            .pipe(mocha())
            .pipe(istanbul.writeReports()) // Creating the reports after tests ran
            .on('end', cb);
    });
});