const gulp = require('gulp'),
      buildMs = require('./build-metalsmith');
      cpAssets = require('./cp-assets');
      sass = require('./sass');

gulp.task('build', gulp.parallel('build-ms', 'cp-assets', 'sass'));
