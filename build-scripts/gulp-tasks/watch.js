const gulp = require('gulp'),
      package = require('../../package');
      settings = require('../../'+package.config.settings);
      watch = require('gulp-watch'),
      browserSync = require('browser-sync');

gulp.task('watch:sass', function() {
  gulp.watch([package.config.dir.src.sass+'/*.scss', package.config.dir.src.sass+'/**/*.scss'], gulp.series('sass'));
});

gulp.task('watch:content', function() {
  browserSync.init(settings.browserSync);
  gulp.watch([package.config.dir.src.contents+'/*', package.config.dir.src.contents+'/**/*', package.config.settings, package.config.metadata], gulp.series('build'));
//  .on('change', browserSync.reload);
});


gulp.task('watch', gulp.parallel('watch:content','watch:sass'));
