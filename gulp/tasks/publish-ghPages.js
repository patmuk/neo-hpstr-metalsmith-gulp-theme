process.env.NODE_ENV = 'production';

const gulp = require('gulp'),
      ghpages = require('gh-pages'),
      path = require('path'),
      setEnv = require('./setNodeEnv'),
      config = require('../../configuration/config'),
      build = require('./build');
//publish to github

gulp.task('publish-gh', gulp.series('set-prod-node-env', 'build', function(done) {
  ghpages.publish(config.dir.dest, {
    repo: config.publish.ghPagesRepo
  }, function(err) {});
  done();
}));
