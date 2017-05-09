const gulp = require('gulp'),
      //require it so that set-env works for all files
      pub_gh = require('./gulp/tasks/publish-ghPages'),
      requireDir = require('require-dir');

requireDir('./gulp/tasks/');

gulp.task('default', gulp.series('build', 'browser-sync','watch'));
