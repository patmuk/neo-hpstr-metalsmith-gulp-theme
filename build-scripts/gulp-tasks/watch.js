const gulp = require('gulp'),
      package_json = require('../../package');
      settings = require('../../'+package_json.config.settings);
      watch = require('gulp-watch'),
      bs_reload = require('browser-sync');

gulp.task('watch:sass', function() {
  gulp.watch(package_json.config.dir.src.sass+'/**/*.scss', gulp.series('sass', 'bs_reload'))
});

//posts and templates
gulp.task('watch:ms-content', function() {
  gulp.watch(package_json.config.dir.src.contents+'/**/*', gulp.series('build-ms', 'bs_reload'));
});

gulp.task('watch:metadata', function() {
  gulp.watch(package_json.config.metadata+'.js', gulp.series('build-ms','bs_reload'));
});

gulp.task('watch:templates', function() {
  gulp.watch([
    package_json.config.dir.src.templates+'/helpers/*',
    package_json.config.dir.src.templates+'/layouts/*',
    package_json.config.dir.src.templates+'/partials/*'
  ], gulp.series('build-ms','bs_reload'));
});

gulp.task('watch:cp-assets', function() {
  gulp.watch(package_json.config.dir.src.assets+'/**/*', gulp.series('cp-assets', 'bs_reload'));
});

gulp.task('watch', gulp.parallel('watch:ms-content','watch:metadata','watch:templates','watch:cp-assets','watch:sass'));
