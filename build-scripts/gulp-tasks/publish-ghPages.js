const gulp = require('gulp'),
      ghpages = require('gh-pages'),
      path = require('path'),
      package_json = require('../../package');

//publish to github
gulp.task('publish-gh', gulp.series('clean','build', function(done) {
//    if (process.env.NODE_ENV != 'production') {throw new Error("gulp publish-gh needs to have NODE_ENV = 'production'. It is best to invoke it with 'npm run publish-gh' instead!");}//console.error();}
    ghpages.publish(package_json.config.dir.dest, {
    repo: package_json.config.publish.ghPagesRepo,
    branch: package_json.config.publish.branch
  }, function(err) {});
  done();
}));
