const gulp = require('gulp'),
      requireDir = require('require-dir');

requireDir('./gulp/tasks/');

gulp.task('default', gulp.series('build', 'browser-sync','watch'));
