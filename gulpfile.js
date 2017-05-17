const gulp = require('gulp'),
      mocha = require('gulp-mocha'),
      requireDir = require('require-dir'),
      tasks = requireDir('./gulp/tasks/');

  gulp.task('default', gulp.series('build', gulp.parallel('watch')));

  gulp.task('test', () =>
  	gulp.src('./test/**/*', {read: false})
  		// `gulp-mocha` needs filepaths so you can't have any plugins before it
  		.pipe(mocha({reporter: 'spec'}))
  );
