const path = require('path'),
      rootdir = path.join(__dirname, '..');

console.log(__dirname);

module.exports = {
  dir: {
    base: rootdir,
    src: {
      root: rootdir+'/src',
      content: rootdir+'/src/process',
      stylesheets: rootdir+'/src/process/assets/stylesheets'
    },
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
  },
  publish: {
    ghPagesRepo: 'https://github.com/patmuk/neo-hpstr-metalsmith-gulp-theme.git',
    branch: 'gh-pages',
    url: 'https://patmuk.github.io/neo-hpstr-metalsmith-gulp-theme'
  }
};
