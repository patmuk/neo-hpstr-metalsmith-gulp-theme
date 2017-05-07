var path = require('path');

var dir = path.join(__dirname, '..');

module.exports = {
  metalsmith: {
    dir: dir,
    src: './src',
    dest: './build',
  },
  watch: {
    src: dir + '/{src,layouts}/**/*'
  },
  browserSync: {
      // start test server
      server: dir + '/build',
      files:  [dir + '/src/**/*']
    }
  };
