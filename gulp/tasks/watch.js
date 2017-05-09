const gulp = require('gulp'),
      config = require('../../configuration/config');

gulp.task('watch', function() {
  gulp.watch(config.watch.src, ['build-metalsmith']);
});
