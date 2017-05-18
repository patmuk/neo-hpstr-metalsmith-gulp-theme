//config
const config = require('../../configuration/config');
const
//gulp-metalsmith setup
      gulp = require('gulp'),
//gulp-plugins
      sass = require('gulp-sass'),
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
