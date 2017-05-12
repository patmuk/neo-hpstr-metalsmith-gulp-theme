const gulp = require('gulp'),
      config = require('../../configuration/config'),
      watch = require('gulp-watch'),
      browserSync = require('browser-sync');

gulp.task('watch:sass', function() {
  gulp.watch([config.dir.src.stylesheets+'/*.scss', config.dir.src.stylesheets+'/**/*.scss'], gulp.series('sass'));
});

gulp.task('watch:content', function() {
  gulp.watch([config.dir.src.content+'/*', config.dir.src.content+'/**/*', config.dir.config+'/*', config.dir.config+'/**/*'], gulp.series('build'))
  .on('change', browserSync.reload);
});


gulp.task('watch', gulp.parallel('watch:content','watch:sass'));
