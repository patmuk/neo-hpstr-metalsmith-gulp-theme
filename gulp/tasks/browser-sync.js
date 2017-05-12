
//obsolete, integrated in "watch.js"
const gulp = require('gulp'),
      browserSync = require('browser-sync'),
      config = require('../../configuration/config');

gulp.task('browser-sync', function() {
  browserSync(config.browserSync);
});
