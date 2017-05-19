const path = require('path'),
      rootdir = path.join(__dirname, '..');

console.log(__dirname);
//plugin settings
//directory locations are set in package.json
module.exports = {
  browserSync: {
    // start test server
    server: rootdir + process.env.npm_package_config_dir_dest,
    files:  [rootdir + '/src/**/*']
  }
};
