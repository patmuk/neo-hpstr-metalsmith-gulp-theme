//config
const package = require('../../package');
const
//gulp-metalsmith setup
      gulp = require('gulp'),
//gulp-plugins
      sass = require('gulp-sass'),
      browserSync = require('browser-sync');

gulp.task('sass', function(done) {
  return gulp.src(package.config.dir.src.sass+'/**/*.scss')
  //compile sass to css
//  .pipe(watch(package.config.dir.src.sass+'/**/*.scss'))//incremental
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(gulp.dest(package.config.dir.dest+'/assets/stylesheets/'))
  .pipe(browserSync.stream());
  done();
});
