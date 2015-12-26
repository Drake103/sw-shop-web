var gulp          = require('gulp');
var path          = require('path');
var browserSync   = require('browser-sync').create();
var jshint        = require('gulp-jshint');
var browserify    = require('browserify');
var source        = require('vinyl-source-stream');
var pkg           = require('./package.json');
var rename        = require('gulp-rename');
var babelify      = require('babelify');
var imagemin      = require('gulp-imagemin');
var sourcemaps    = require('gulp-sourcemaps');
var plumber       = require('gulp-plumber');
var autoprefixer  = require('gulp-autoprefixer');
var concat        = require('gulp-concat');
var gulpFilter    = require('gulp-filter');
var express       = require('express');
var sass          = require('gulp-sass');
var neat          = require('node-neat');
var rigger        = require('gulp-rigger');
var _             = require('lodash');
var path          = require('path');

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });
});

gulp.task('static-server', function() {
  var app = express();
  app.use(express.static('./dist'));
  var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
});

gulp.task('sass:build', function() {

  var bootstrapPath = './node_modules/bootstrap-sass/assets/stylesheets';

  gulp.src('./styles/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass.sync({ includePaths: _.flatten([neat.includePaths, bootstrapPath], true) })
      .on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./styles/**/*.scss', ['sass:build']);
});

gulp.task('fonts', function() {
  gulp.src(['node_modules/font-awesome/fonts/*', './fonts/*'])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('data:build', function() {
  gulp.src(['./data/*'])
    .pipe(gulp.dest('dist/data'));
});

gulp.task('data:watch', function() {
  gulp.watch('./data/**/*', ['data:build']);
});

gulp.task('favicon', function() {
  gulp.src(['./favicon.ico'])
    .pipe(gulp.dest('dist'));
});

gulp.task('images:build', function() {
  gulp.src('./images/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest('./dist/images'));
});

gulp.task('images:watch', function() {
  gulp.watch('./images/**/*', ['images:build']);
});

gulp.task('js:lint', function() {
  gulp.src('/app/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('js:build', function() {
  var bundle = browserify({
    entries: ['./app/index.js'],
    paths: ['./node_modules'],
    debug: true,
  });

  bundle.transform(babelify, { presets: ['es2015'] });
  bundle.require('./app/config/client.js', { expose: 'config' });

  bundle.bundle()
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(source('script.js'))
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('js:watch', function() {
  gulp.watch('./app/**/*.js', ['js:build']);
});

gulp.task('html:build', function() {
  gulp.src(['./app/**/*.html'])
      .pipe(rigger())
      .on('error', console.log)
  .pipe(gulp.dest('./dist'));
});

gulp.task('html:watch', function() {
  gulp.watch('./app/**/*.html', ['html:build']);
});

gulp.task('watch', ['images:watch', 'js:watch', 'sass:watch', 'html:watch', 'data:watch']);

gulp.task('default', ['images:build', 'js:build', 'sass:build', 'html:build', 'fonts', 'data:build', 'favicon']);

gulp.task('serve', ['default', 'static-server', 'watch']);
