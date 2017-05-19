//config
const package_json = require('../../package'),
      metadata = require('../../'+package_json.config.metadata);
const
//gulp-metalsmith setup
      gulp = require('gulp');

gulp.task('cp-assets', function(done) {
  //add site.url to font-awsome/_variables.scss
  return gulp.src(package_json.config.dir.src.rootdir+'/assets/**/*')
  .pipe(gulp.dest(package_json.config.dir.dest+'/assets'))
  done();
});
