var gulp = require('gulp');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-minify-css');

gulp.task('bundle-html', function () {
    return gulp.src('index.html')
        .pipe(useref())
		.pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});
