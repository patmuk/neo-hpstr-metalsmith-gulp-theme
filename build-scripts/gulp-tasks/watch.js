const gulp = require('gulp'),
      package_json = require('../../package');
      settings = require('../../'+package_json.config.settings);
      watch = require('gulp-watch'),
      browserSync = require('browser-sync');

gulp.task('watch:sass', function() {
  gulp.watch(package_json.config.dir.src.sass+'/**/*.scss', gulp.series('sass'));
});

//posts and templates
gulp.task('watch:ms-content', function() {
  gulp.watch(package_json.config.dir.src.contents+'/**/*', gulp.series('build-ms'));
//  .on('change', browserSync.reload);
});

gulp.task('watch:metadata', function() {
  gulp.watch([package_json.config.metadata+'.js'], gulp.series('build-ms'));
});

gulp.task('watch:cp-assets', function() {
  gulp.watch([package_json.config.dir.src.assets+'/**/*'], gulp.series('cp-assets'))
  //    .on('change', browserSync.reload);
      .on('all', browserSync.reload);
//  ;gulp.on('all', browserSync.reload);
});

gulp.task('watch', gulp.parallel('watch:ms-content','watch:metadata','watch:cp-assets','watch:sass'));
