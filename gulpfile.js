const gulp = require('gulp'),
      requireDir = require('require-dir')('./gulp/tasks/');

  gulp.task('default', gulp.series('build', gulp.parallel('watch')));
