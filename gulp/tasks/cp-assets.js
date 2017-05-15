//config
const config = require('../../configuration/config'),
      metadata = require(config.dir.config+'/metadata');
const
//gulp-metalsmith setup
      gulp = require('gulp');

gulp.task('cp-assets', function(done) {
  //add site.url to font-awsome/_variables.scss
  return gulp.src(config.dir.src.root+'/assets/**/*')
  .pipe(gulp.dest(config.dir.dest+'/assets'))
  done();
});
