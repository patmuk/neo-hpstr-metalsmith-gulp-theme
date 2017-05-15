const gulp = require('gulp'),
      ghpages = require('gh-pages'),
      path = require('path'),
      config = require('../../configuration/config'),
      build = require('../../gulpfile.js');
//publish to github

gulp.task('publish-gh', gulp.series('build', function(done) {
    if (process.env.NODE_ENV != 'production') {throw new Error("gulp publish-gh needs to have NODE_ENV = 'production'. It is best to invoke it with 'npm run publish-gh' instead!");}//console.error();}
    ghpages.publish(config.dir.dest, {
    repo: config.publish.ghPagesRepo,
    branch: config.publish.branch
  }, function(err) {});
  done();
}));
