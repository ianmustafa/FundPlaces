var gulp          = require('gulp'),
    browserSync   = require('browser-sync'),
    autoPrefixer  = require('gulp-autoprefixer'),
    concat        = require('gulp-concat'),
    jade          = require('gulp-jade'),
    less          = require('gulp-less'),
    minifyCSS     = require('gulp-minify-css'),
    print         = require('gulp-print'),
    rename        = require('gulp-rename'),
    uglify        = require('gulp-uglify'),

    setPrefix = [
      'last 2 version',
      '> 1%',
      'opera 12.1',
      'safari 6',
      'ie 9',
      'bb 10',
      'android 4'
    ],

    files = {
      template: {
        source: 'template/*.jade',
        dest: 'public/'
      },
      less: {
        watch: 'less/**/*.less',
        source: 'less/style.less',
        dest: 'public/css/'
      },
      js: {
        source: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/bootstrap/js/transition.js',
          'bower_components/bootstrap/js/collapse.js'
        ],
        dest: 'public/js/'
      },
      maps: {
        dest: '../maps/'
      }
    }
;


// BrowserSync
gulp.task('browser-sync', function() {
  browserSync({
    proxy: 'localhost:42600',
    open: false
  });
});

gulp.task('bs-reload', function () {
  browserSync .reload();
});


// Build
gulp.task('build:template', function() {
  gulp.src(files.template.source)
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest(files.template.dest))
    .pipe(print(function (file) { return file + ' has successfully created.' }));

  browserSync .reload();
});

gulp.task('build:less', function() {
  gulp.src(files.less.source)
    .pipe(less())
    .pipe(autoPrefixer(setPrefix))
    .pipe(gulp.dest(files.less.dest))
    .pipe(print(function (file) { return file + ' has successfully created.' }))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(rename('style.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(files.less.dest))
    .pipe(print(function (file) { return file + ' has successfully created.' }))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('build:js', function() {
  gulp.src(files.js.source)
    .pipe(concat('core.js'))
    .pipe(gulp.dest(files.js.dest))
    .pipe(print(function (file) { return file + ' has successfully created.' }))
    .pipe(uglify())
    .pipe(rename('core.min.js'))
    .pipe(gulp.dest(files.js.dest))
    .pipe(print(function (file) { return file + ' has successfully created.' }));

  browserSync.reload();
});


// Watch files
gulp.task('watch', function() {
  gulp.watch(files.template.source, function (file) {
    gulp.src(file.path).pipe(print(function (file) { return file + ' has modified.' }));
    gulp.start('build:template');
  });

  gulp.watch(files.less.watch, function (file) {
    gulp.src(file.path).pipe(print(function (file) { return file + ' has modified.' }));
    gulp.start('build:less');
  });
});


// Default
gulp.task('default', ['browser-sync', 'watch']);
