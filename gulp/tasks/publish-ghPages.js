const gulp = require('gulp'),
      config = require('../../configuration/config');
      ghpages = require('gh-pages');
      path = require('path');
//publish to github
process.env.NODE_ENV = 'production';

gulp.task('publish-gh', ['build'], function() {
  ghpages.publish(config.dir.dest, {
    repo: config.publish.ghPagesRepo
  }, function(err) {});
});
