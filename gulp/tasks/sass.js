//config
const config = require('../../configuration/config'),
      metadata = require(config.dir.config+'/metadata');
const
//gulp-metalsmith setup
      gulp = require('gulp'),
//gulp-plugins
      filter = require('gulp-filter'),
      replace = require('gulp-replace'),
      sass = require('gulp-sass'),
      debug = require('gulp-debug'),
      browserSync = require('browser-sync');

gulp.task('sass', function(done) {
  return gulp.src(config.dir.src.stylesheets+'/**/*.scss')
  //compile sass to css
//  .pipe(watch(config.dir.src.stylesheets+'/**/*.scss'))//incremental
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(gulp.dest(config.dir.dest+'/assets/stylesheets/'))
  .pipe(browserSync.stream());
  done();
});
