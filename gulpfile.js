const gulp = require('gulp'),
      mocha = require('gulp-mocha'),
      requireDir = require('require-dir'),
      package_json = require('./package'),
      tasks = requireDir(package_json.config.dir.buildScripts+'/gulp-tasks/');

  gulp.task('try', function (done) {
    console.log('config: from env: '+process.env.npm_package_json_config_dir_buildScripts);
    console.log('config: from require: '+package_json.config.dir.buildScripts);
    done();
  });

  gulp.task('default', gulp.series('build', gulp.parallel('watch')));
  gulp.task('test', () =>
  	gulp.src('./test/**/*', {read: false})
  		// `gulp-mocha` needs filepaths so you can't have any plugins before it
  		.pipe(mocha({reporter: 'spec'}))
  );
