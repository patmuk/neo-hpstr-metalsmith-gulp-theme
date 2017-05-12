//config
process.env.DEBUG = 'metalsmith:destination metalsmith';
const devBuild = ((process.env.NODE_ENV || '').trim().toLowerCase() !== 'production'),
      debug = devBuild ? require('gulp-debug') : null,
//      debug = devBuild ? require('metalsmith-debug') : null;
      config = require('../../configuration/config');
      metadata = require(config.dir.config+'/metadata');
console.log("build: NODE_ENV is "+process.env.NODE_ENV);
const
//gulp-metalsmith setup
      gulp = require('gulp'),
      del = require('del'),
      fs = require('fs'),
      gulpsmith = require('gulpsmith'),
      gulp_front_matter = require('gulp-front-matter'),
      assign = require('lodash.assign');


const
//metalsmith-plugins
      assets             = require('metalsmith-assets'),
      collections        = require('metalsmith-collections'),
      discoverHelpers    = require('metalsmith-discover-helpers'),
      discoverPartials   = require('metalsmith-discover-partials'),
      drafts             = require('metalsmith-drafts'),
      excerpts           = require('metalsmith-excerpts'),
      gravatar           = require('metalsmith-gravatar'),
      inPlace            = require('metalsmith-in-place'),
      inspect            = require('metalsmith-inspect'),
      layouts            = require('metalsmith-layouts'),
      lunr               = require('metalsmith-lunr'),
      markdownRemarkable = require('metalsmith-markdown-remarkable'),
      paginate           = require('metalsmith-paginate'),
      permalinks         = require('metalsmith-permalinks'),
      prism              = require('metalsmith-prism'),
      remarkableEmoji    = require('remarkable-emoji'),
      remarkableMentions = require('remarkable-mentions'),
      striptags          = require('striptags'),
      {TfIdf}            = require('natural'),
//gulp-plugins
      filter = require('gulp-filter'),
      replace = require('gulp-replace'),
      sass = require('gulp-sass'),
      watch = require('gulp-watch');

gulp.task('clean', function () {
  return del(config.dir.dest+'/**');
});

gulp.task('sass', function(done) {
  console.log("ENV "+process.env.NODE_ENV);
  console.log("devBuild "+devBuild);
  //add site.url to font-awsome/_variables.scss
  const f = filter([config.dir.src.stylesheets+'/vendor/font-awesome/_variables.scss'], {restore: true});
  return gulp.src(config.dir.src.stylesheets+'/**/*.scss')
  .pipe(f)
  .pipe(replace(/(\$fa-font-path:\s*")(.*)"/g, '$1'+metadata.site.url+'$2"'))
  .pipe(f.restore)
  //compile sass to css
//  .pipe(watch(config.dir.src.stylesheets+'/**/*.scss'))//incremental
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(gulp.dest(config.dir.dest+'/assets/stylesheets/'));
  done();
});

gulp.task('build', gulp.parallel('sass', function () {
  return gulp
  .src([config.dir.src.content+'/**/*', '!'+config.dir.src.stylesheets+'/**/*.scss'])
// never finishes
//  .pipe(watch([config.dir.src.content+'/**/*', '!'+config.dir.src.stylesheets+'/**/*.scss']))//incremental
    .pipe(gulp_front_matter()).on("data", function(file) {
        assign(file, file.frontMatter);
        delete file.frontMatter;
    })
    .pipe(
        gulpsmith(config.dir.base)
        .metadata(metadata)
        .use(inspect({
              disable: true,
              includeMetalsmith: true,
              exclude: ['contents',  'excerpt', 'stats', 'next', 'previous'],
            }))
        .use(drafts())
        .use(collections({
            posts: {
              sortBy: 'date',
              reverse: true,
            }
          }))
        .use(relations({
            max: 3,
            match: {
              collection: 'posts',
            }
          }))
        .use(markdownRemarkable('full', {
            html: true,
            linkify: true,
            typographer: true,
          })
          .use(remarkableEmoji)
          .use(remarkableMentions())
        )
        .use(prism({
            lineNumbers: true,
          }))
        .use(excerpts())
        .use(gravatar({
            owner: "you@email.com",
          }))
        .use(permalinks({
            pattern: ':title',
            linksets: [
              {
                match: { collection: 'posts' },
                pattern: ':date/:title',
              },
            ],
          }))
        .use(paginate({
            path: 'page',
          }))
        .use(discoverHelpers({
            directory: config.dir.src.root+'/helpers'
          }))
        .use(discoverPartials({
            directory: config.dir.src.root+'/partials'
          }))
        .use(inPlace())
        .use(layouts({
            engine: 'handlebars',
            default: 'page.html',
            directory: config.dir.src.root+'/layouts',
          }))
        .use(lunr({
            ref: 'path',
            indexPath: 'search/index.json',
            fields: {
              title: 5,
              contents: 1,
              tags: 10,
            },
            preprocess: striptags
          }))
        .use(assets({
            source: config.dir.src.root+'/assets',
            destination: 'assets',
          }))
    )
    .pipe(gulp.dest(config.dir.dest));
}));

function preparePages(entries) {
  return entries.items.reduce(function (acc, item) {
    acc[item.fields.slug.replace(/\.html$/, '.md')] = {
      title: item.fields.title,
      order: item.fields.order,
      layout: 'basic.swig',
      contents: item.fields.content
    };
    return acc;
  }, {});
}

function relations(options) {
  options = Object.assign({
    terms: 5,
    max: 5,
    threshold: 0,
    text: document => String(document.contents)
  }, options);

  if(options.match == null) {
    throw new Error("Expected match criteria on which to filter.");
  }

  function matchDocument(file) {
    const {match} = options;

    return Object.keys(match).every(key => {
      if(file[key] === match[key]) { return true }
      if(file[key] && file[key].indexOf) {
        return file[key].indexOf(match[key]) > -1;
      }

      return false;
    });
  }

  return (files, metalsmith, done) => {
    const tfidf = new TfIdf();
    const keys = Object.keys(files).filter(key => matchDocument(files[key]));

    keys.forEach(key => tfidf.addDocument(options.text(files[key]), key));

    keys.forEach((key, index) => {
      const document = files[key];
      const keyTerms = tfidf.listTerms(index)
      .slice(0, options.terms)
      .map(({term}) => term);

      document.relations = keys.reduce((relations, key, d) => {
        if(d !== index) {
          const frequency = tfidf.tfidf(keyTerms, d);

          if(frequency > options.threshold) {
            relations.push({key, frequency});
          }
        }

        return relations;
      }, [])
      .sort((a, b) => a.frequency - b.frequency)
      .slice(0, options.max)
      .map(({key}) => files[key]);
    });

    done();
  };
}
