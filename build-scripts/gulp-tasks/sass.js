//config
const package_json = require('../../package');
const
//gulp-metalsmith setup
      gulp = require('gulp'),
//gulp-plugins
      sass = require('gulp-sass');

gulp.task('sass', function(done) {
  return gulp.src(package_json.config.dir.src.sass+'/**/*.scss')
  //compile sass to css
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(gulp.dest(package_json.config.dir.dest+'/assets/stylesheets/'))
  done();
});
