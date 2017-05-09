const gulp = require('gulp');

//publish NODE_ENV
gulp.task('set-dev-node-env', function(done) {
  process.env.NODE_ENV = 'development';
  done();
});

gulp.task('set-prod-node-env', function(done) {
    process.env.NODE_ENV = 'production';
    done();
});
