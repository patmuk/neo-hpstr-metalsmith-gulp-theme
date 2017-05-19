//config
const package = require('../../package'),
      metadata = require('../../'+package.config.metadata);
const
//gulp-metalsmith setup
      gulp = require('gulp');

gulp.task('cp-assets', function(done) {
  //add site.url to font-awsome/_variables.scss
  return gulp.src(package.config.dir.src.rootdir+'/assets/**/*')
  .pipe(gulp.dest(package.config.dir.dest+'/assets'))
  done();
});
