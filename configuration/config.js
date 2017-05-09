const path = require('path'),
      rootdir = path.join(__dirname, '..');

console.log(__dirname);

module.exports = {
  dir: {
    base: rootdir,
    src: rootdir+'/src',
    dest: rootdir+'/build',
    config: rootdir+'/configuration'
  },
  watch: {
    src: rootdir + '/{src,layouts,configuration}/**/*'
  },
  browserSync: {
      // start test server
      server: rootdir + '/build',
      files:  [rootdir + '/src/**/*']
    }
  };
