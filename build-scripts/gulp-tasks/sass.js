//config
const package_json = require('../../package');
const
//gulp-metalsmith setup
      gulp = require('gulp'),
//gulp-plugins
      sass = require('gulp-sass'),
      browserSync = require('browser-sync');

console.log("SASS path is: "+package_json.config.dir.src.sass+'/**/*.scss');

gulp.task('sass', function(done) {
  return gulp.src(package_json.config.dir.src.sass+'/**/*.scss')
  //compile sass to css
//  .pipe(watch(package_json.config.dir.src.sass+'/**/*.scss'))//incremental
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(gulp.dest(package_json.config.dir.dest+'/assets/stylesheets/'))
  .pipe(browserSync.stream());
  done();
});
