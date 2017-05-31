const path = require('path'),
      rootdir = path.join(__dirname, '..'),
      package_json = require('../package');

//plugin settings
//directory locations are set in package_json.json
module.exports = {
  browserSync: {
    // start test server
    server: rootdir + '/' + package_json.config.dir.dest,
    files:  [rootdir + '/src/**/*']
  },
  publish: {
    ghPagesRepo: 'https://github.com/patmuk/neo-hpstr-metalsmith-gulp-theme.git',
    branch: 'gh-pages',
    url: 'https://patmuk.github.io/neo-hpstr-metalsmith-gulp-theme'
  }
};
