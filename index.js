'use strict';
//config
process.env.DEBUG = 'metalsmith:destination metalsmith';
const prodBuild = ((process.env.NODE_ENV || '').trim().toLowerCase() == 'production'),
      debugBuild = ((process.env.NODE_ENV || '').trim().toLowerCase() == 'debug'),
      package_json = require('./package'),
      settings = require(package_json.config.settings),
      metadata = require(package_json.config.metadata);

const metalsmith         = require('metalsmith');
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

      browsersync = !prodBuild ? require('metalsmith-browser-sync') : null,
      sass = require('metalsmith-sass');

console.log('ENV:', process.env.NODE_ENV || 'development');

var ms = metalsmith(__dirname)
.metadata(metadata);

if (debugBuild) ms.use(inspect({
  disable: false,
  includeMetalsmith: true,
  exclude: ['contents',  'excerpt', 'stats', 'next', 'previous'],
}));

ms
.source(package_json.config.dir.src.rootdir+'/process/contents')
.destination(package_json.config.dir.dest)
.clean(prodBuild)
.use(sass())
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
.use(
  markdownRemarkable('full', {
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
    directory: package_json.config.dir.src.rootdir+'/helpers'
  }))
.use(discoverPartials({
    directory: package_json.config.dir.src.rootdir+'/partials'
  }))
.use(inPlace())
.use(layouts({
  engine: 'handlebars',
  default: 'page.html',
  directory: package_json.config.dir.src.rootdir+'/layouts',
  pattern: '**/*.html'
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
//if processed files (like sass) are mixed with static files (like css) use .ignore('**/*.scss')
.use(assets({
  source: package_json.config.dir.src.rootdir+'/assets',
  destination: 'assets',
}));

if (browsersync) ms.use(browsersync({     // start test server
  server: package_json.config.dir.dest,
  files:  [package_json.config.dir.src.rootdir + '/**/*']
}));

ms.build((error, files) => {
  if(error) {
    throw error;
  }
});

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
