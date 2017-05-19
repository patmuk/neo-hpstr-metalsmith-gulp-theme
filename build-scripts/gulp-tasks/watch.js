const gulp = require('gulp'),
      package_json = require('../../package');
      settings = require('../../'+package_json.config.settings);
      watch = require('gulp-watch'),
      browserSync = require('browser-sync');

gulp.task('watch:sass', function() {
  gulp.watch([package_json.config.dir.src.sass+'/*.scss', package_json.config.dir.src.sass+'/**/*.scss'], gulp.series('sass'));
});

gulp.task('watch:content', function() {
  browserSync.init(settings.browserSync);
  gulp.watch([package_json.config.dir.src.contents+'/*', package_json.config.dir.src.contents+'/**/*', package_json.config.settings, package_json.config.metadata], gulp.series('build'));
//  .on('change', browserSync.reload);
});


gulp.task('watch', gulp.parallel('watch:content','watch:sass'));
