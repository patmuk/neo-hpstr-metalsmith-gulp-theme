//config
const config = require('../../configuration/config'),
      metadata = require(config.dir.config+'/metadata');
const
//gulp-metalsmith setup
      gulp = require('gulp'),
//gulp-plugins
      filter = require('gulp-filter'),
      replace = require('gulp-replace'),
      sass = require('gulp-sass'),
      debug = require('gulp-debug'),
      browserSync = require('browser-sync');

gulp.task('sass', function(done) {
  //add site.url to font-awsome/_variables.scss
//  const f = filter([config.dir.src.stylesheets+'/vendor/font-awesome/_variables.scss'], {restore: true});
//  const f = filter('./src/process/assets'+'/vendor/font-awesome/_variables.scss', {restore: true});
//const f = filter(['/Users/pmukherj/tmp/blog/blog-repo/src/process/assets/stylesheets/vendor/font-awesome/_variables.scss'], {restore: true});
const f = filter(['src/process/assets/stylesheets/vendor/font-awesome/_variables.scss'], {restore: true});
  return gulp.src(config.dir.src.stylesheets+'/**/*.scss')
  .pipe(f)
.pipe(debug({title: 'filtered:'}))
  .pipe(replace(/(\$fa-font-path:\s*")(.*)"/g, '$1'+metadata.site.url+'$2"'))
//  .pipe(gulp.dest(config.dir.dest+'/assets/stylesheets/'))
  .pipe(f.restore)
  .pipe(debug({title: 'restored:'}))
  //compile sass to css
//  .pipe(watch(config.dir.src.stylesheets+'/**/*.scss'))//incremental
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(gulp.dest(config.dir.dest+'/assets/stylesheets/'))
  .pipe(browserSync.stream());
  done();
});
