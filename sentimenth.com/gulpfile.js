'use strict';
// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var connect = require('gulp-connect');
var cache = require('gulp-cache');
const phpMinify = require('@aquafadas/gulp-php-minify');
// var gutil = require('gulp-util'),


gulp.task('minify:php', () => gulp.src('app/src/**/*.php', {read: false})
  .pipe(phpMinify())
  .pipe(gulp.dest('app/dist'))
);


// Watch Files For Changes
gulp.task('watch', function() {});

// Compile Our Sass
gulp.task('sass', function () {
  return gulp.src('app/src/scss/*.scss')
	  .pipe(sourcemaps.init())
		// Not Minify Our Sass
    // .pipe(sass.sync().on('error', sass.logError))
    // Minify Our Sass
	  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('app/dist/css/'));
});
// Watch for SASS changes
gulp.task('sass:watch', function () {
  gulp.watch('app/src/scss/*.scss', ['sass'], function() {
    gulp.run('sass');
    gulp.run('htmlReload');
  });
});

// Minify Our HTML
gulp.task('htmlmin', function() {
  return gulp.src('app/src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('app/dist'));
});
// Watch for HTML changes
gulp.watch('app/src/*.html', function() {
  gulp.run('htmlmin');
  gulp.run('htmlReload');
});

// Compile JS
gulp.task('scripts', function() {
  gulp.src('app/src/scripts/*.js')
  .pipe(gulpIf('*.js', uglify()))
  // .pipe(concat('allScripts.js'))
  .pipe(gulp.dest('app/dist/scripts'))
});
// Watch for JS changes
gulp.watch('app/src/scripts/*.js', function() {
  gulp.run('scripts');
  gulp.run('htmlReload');
});

// Minify Our Images
gulp.task('imagemin', function(){
  return gulp.src('app/src/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(imagemin({
      interlaced: true
    }))
  .pipe(gulp.dest('app/dist/images'))
});
// Watch for IMG changes
gulp.watch('app/src/images/**/*.+(png|jpg|jpeg|gif|svg)', function() {
  gulp.run('imagemin');
});
 
// Copying fonts to Our Dist
gulp.task('fonts', function() {
  return gulp.src('app/src/fonts/**/*')
  .pipe(gulp.dest('app/dist/fonts'))
})

// Connect Reloads Browser
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  })
});
gulp.task('htmlReload', function () {
  gulp.src('app/dist/*.html')
    .pipe(connect.reload());
});


// Default Gulp Tasks
gulp.task('default', ['watch', 'sass', 'sass:watch', 'scripts', 'htmlmin', 'imagemin', 'connect', 'htmlReload', 'fonts'], function(){
  console.log('Building files');
})


