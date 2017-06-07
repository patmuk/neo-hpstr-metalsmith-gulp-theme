//config
const package_json = require('../../package'),
//gulp-metalsmith setup
      gulp = require('gulp');
      browserSync = require('browser-sync'),
      cached = require('gulp-cached');

gulp.task('cp-assets', function(done) {
  return gulp.src(package_json.config.dir.src.rootdir+'/assets/**/*')
//  slower if there are not many files. activate if cp-assets is slow.
//  .pipe(cached('assets'))//for incremental build, only changed files pass. Use gulp-remember to restore all files
  .pipe(gulp.dest(package_json.config.dir.dest+'/assets'))
  done();
});
