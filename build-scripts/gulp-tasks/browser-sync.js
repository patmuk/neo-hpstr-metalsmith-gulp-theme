
//obsolete, integrated in "watch.js"
const gulp = require('gulp'),
      browserSync = require('browser-sync'),
//      package_json = require('../../package'),
//      settings = require('../../'+package_json.config.settings);
      settings = require('../../configuration/settings');

gulp.task('browser-sync', function() {
  browserSync(settings.browserSync);
});
