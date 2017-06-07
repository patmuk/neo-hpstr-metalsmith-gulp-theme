
const gulp = require('gulp'),
      browserSync = require('browser-sync'),
      settings = require('../../configuration/settings');

const server = browserSync.create();

gulp.task('bs_serve', function (done) {
  server.init(settings.browserSync);
  done();
});

gulp.task('bs_reload', function (done) {
  server.reload();
  done();
});
