//config
const package_json = require('../../package'),
//gulp-metalsmith setup
      gulp = require('gulp');
      browserSync = require('browser-sync');

gulp.task('cp-assets', function(done) {
  return gulp.src(package_json.config.dir.src.rootdir+'/assets/**/*')
  .pipe(gulp.dest(package_json.config.dir.dest+'/assets'))
  done();
});
