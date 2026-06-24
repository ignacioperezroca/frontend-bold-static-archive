
var tinypng = require('gulp-tinypng');

gulp.task('tinypng', function () {
    gulp.src('app/src/images/*.png')
        .pipe(tingpng('w390U9r6ozSymeW5QLBkLizN3GmDNoAZ'))
        .pipe(gulp.dest('app/dist'));
});


var connect = require('gulp-connect');
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  })
});
gulp.task('htmlReload', function () {
  gulp.src('app/dist/*.html')
  gulp.src('app/dist/*.php')
    .pipe(connect.reload());
});

// .
// ├── .tmp
// │   ├── app.css
// │   ├── app.js
// │   ├── header.html
// │   └── index.html
// ├── bower_components
// │   └── angular
// ├── dist
// │   ├── app.min.css
// │   ├── app.min.js
// │   └── index.html
// └── src
//     ├── app.scss
//     ├── app.ts
//     ├── components
//     ├── header.jade
//     ├── index.html
//     └── shared



// Complete Integration
// To be able to see the changes we make to source files, we need to reload the server after there is a change. It means that we need to establish a relation between watch and connect, and we need to pipe the end of some tasks to connect.reload().

// The final gulpfile.js looks like this:

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var coffeeSources = ['scripts/hello.coffee'],
    jsSources = ['scripts/*.js'],
    sassSources = ['styles/*.scss'],
    htmlSources = ['**/*.html'],
    outputDir = 'assets';


gulp.task('log', function() {
  gutil.log('== My First Task ==')
});

gulp.task('copy', function() {
  gulp.src('index.html')
  .pipe(gulp.dest(outputDir))
});

gulp.task('sass', function() {
  gulp.src(sassSources)
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(gulp.dest('assets'))
  .pipe(connect.reload())
});

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
  .pipe(coffee({bare: true})
    .on('error', gutil.log))
  .pipe(gulp.dest('scripts'))
});

gulp.task('js', function() {
  gulp.src(jsSources)
  .pipe(uglify())
  .pipe(concat('allScript.js'))
  .pipe(gulp.dest(outputDir))
  .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch(sassSources, ['sass']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});

gulp.task('html', function() {
  gulp.src(htmlSources)
  .pipe(connect.reload())
});

gulp.task('default', ['html', 'coffee', 'js', 'sass', 'connect', 'watch']);





// Minify Our Images WITH CACHE
gulp.task('imagemin', function(){
  return gulp.src('app/src/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('app/dist/images'))
});