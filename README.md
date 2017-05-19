# [Neo-HPSTR Metalsmith Theme][6]

[![GitHub Version][3]][4]

Neo-HPSTR Metalsmith is a responsive and modern blog template based on [Neo-HPSTR Jekyll][1], ported to metalsmith by [TJ Peden's template][11]

![Preview][5]

[Demo][6]

## Contents

- [Installation](#installation)
- [Features](#features)
- [gulp-build](#gulp-build)
- [Configuration](#configuration)
- [Testing](#Testing)
- [License](#license)

## Installation

### Boilerplate / Fork

1. [Fork the repo][7]
1. Clone the fork locally (`git clone git@github.com:username/reponame.git`)
1. Delete the stock posts and images
1. Install NPM modules (`npm install`)
1. Build into `/build` with `gulp` OR `node .` OR `npm build`
1. Make it your own!

NOTE: If you're going to serve this using GitHub Pages, be sure to enable GitHub Pages in your settings and select your desired source.

## Features

* Modern design.
* Responsive templates (`post`, `page` and `home`) in `/layouts`. Looks great on mobile, tablet and desktop devices.
* Gracefully degrades in older browsers. Compatible with Internet Explorer 8+ and all modern browsers.
* Sweet topbar animated menu with support for drop-downs.
* Optional [Disqus][8] command and social sharing links.
* [Open Graph][9] and [Twitter Cards][10] support for a better social sharing experience.
* Simple custom [404 page](content/404.html.hbs) to get you started.
* [Syntax highlighting](#) to make your code examples look snazzy.
* Author panel with social links.

## gulp-build
`gulp` is the prefered way to build, as it should be the fastest. Tasks are executed in parallel. Most metalsmith plugins are just wrapped gulp plugins.

However, for this template `node .` is a bit faster. It builds everything using purely metalsmith, which is sequential (?), thus (with more content) it should be slower.

A hyped option is to build using npm only (`npm run build`), which uses cli commands whenever possible.
However, it is 2-3x slower than the other options! I assume that node is started for every command in the chain individually.

build times:

command              | build time
-------------------- | -----------
`node .`             | real	0m2.979s, user	0m2.341s, sys	0m0.295s
`npm run msBuild`    |  real	0m4.007s, user	0m3.029s, sys	0m0.372s
`gulp build`         |  real	0m4.016s, user	0m2.915s, sys	0m0.388s
`npm run gulpBuild`  |  real	0m5.066s, user	0m3.595s, sys	0m0.464s
`npm run build`      |  real	0m6.909s, user	0m6.630s, sys	0m0.975s

npm run `gulpBuild` is a calling `gulp`
npm run `msBuild` is a calling `node .`

However, to be comparable the 'browser-sync' task has been commented.

build times have been messured with `echo "$(time ( gulp build ) 2>&1 1>/dev/null )"`

### usage
`gulp` to build the blog into `/build`, and start it in a browser window

`gulp build` to just build the blog (to `build`)

`gulp browser-sync` to build and view it in a browser window (same as `gulp`, but without cleaning the build directory first)

`gulp clean` to clean the build-directory for a fresh rebuild

#### dev and prod mode
prefix the gulp commando with
`NODE_ENV='production'` to build code for production.
All other values (or none) are treated as dev mode.

#### Publish to GitHub Pages
Use `npm run gulp publish-gh` or `NODE_ENV='production' gulp publish-gh` to upload the build result to GitHub Pages (the goal repository must be set in `/configuration/config.js`).

This is needed to have production mode enabled (which corrects the url for all assets). `gulp publish-gh` will abort with an error message.

## Configuration

Here are some tips on how to customize your blog theme. If you have questions, just open a new issue. :)

Configure the bolg's metadata in ./configuration/metadata.js file.

### Project tree

├── LICENSE  
├── README.md  
├── gulpfile.js                     # main build file, using `gulp`  
├── index.js                        # main build file, using `node .`  
├── package.json                    # main build file, using `npm run build`  
|                                   # package dependencies for all builds, install with `npm install`  
|                                   # directory settings  
├──configuration/                   # configuration for the blog  
|   ├── settings.js                 # build settings for the plugins  
|   └── metadata.js                 # blog metadata  
├── build-scripts                   # scripts used in a build  
│   └── gulp-tasks                  # individual gulp build tasks (instead of a single gulpfile.js)  
│       ├── browser-sync.js         # view locally built blog in browser  
│       ├── build-metalsmith.js     # task to build the html files (inluding posts) only  
│       ├── build.js                # main task to build the blog, calls the other build-tasks in parallel  
│       ├── cp-assets.js            # task to copy the static assets  
│       ├── publish-ghPages.js      # task to publish the result to gitHub Pages. Configure it in package.json  
│       ├── sass.js                 # task to build css from scss sources  
│       └── watch.js                # rebuild on file changes (not tested)  
├── src                             # all sources needed for the build process  
|   ├── assets                      # assets to be copied unprocessed to `/build`  
|   │   ├── fonts/                  # fonts (i.e. FontAwesome)  
|   │   ├── images/                 # images (i.e. logo, favicon, etc)  
|   │   ├── javascripts/            # third-party and page specific js  
|   │   ├── stylesheets/            # css (not compiled)  
|   ├── helpers/                    # handlebars helpers  
|   ├── layouts/                    # blog layouts  
|   │   ├── home.html  
|   │   ├── page.html  
|   │   └── post.html  
|   ├── partials/  
|   │   ├── author.hbs              # author banner (at the end of post)  
|   │   ├── disqus-comments.hbs     # comments  
|   │   ├── footer.hbs              # page footer  
|   │   ├── head.hbs                # site head, with css includes and metadata  
|   │   ├── header.hbs              # header menu  
|   │   ├── icons.hbs               # site icons  
|   │   ├── pagination.hbs          # pagination  
|   │   ├── read-more.hbs           # read-more banner, to recommend posts  
|   │   ├── scripts.hbs             # js scripts  
|   │   └── social-share.hbs        # floating social share integration  
|   └── process                     # files to process  
|       ├── 404.html.hbs            # 404 page  
|       ├── _posts                  # blog posts  
|       ├── about/index.md          # about page  
|       ├── assets/stylesheets      # blog style; scss to be compiled to /build/assets/stylesheets  
|       ├── index.html.hbs          # home page  
|       ├── posts/index.html.hbs    # archives page  
|       └── search/index.html.hbs   # search page  
└── test                            # mocha tests  
    └── checkOutput.js              # test to check the resulting directory structure  


## Testing
Run the tests with
(fastes)
'./node_modules/.bin/mocha --reporter spec'
(slower)
`npm test`
(slowest)
`gulp test`

## License

The theme is available as open source under the terms of the [MIT License][2].

[1]: https://github.com/aron-bordin/neo-hpstr-jekyll-theme
[2]: http://opensource.org/licenses/MIT
[3]: https://badge.fury.io/gh/tjpeden%2Fneo-hpstr-metalsmith-theme.svg
[4]: https://badge.fury.io/gh/tjpeden%2Fneo-hpstr-metalsmith-theme
[5]: /src/assets/images/neo-hpstr-metalsmith-theme.png?raw=true
[6]: http://peden.software/neo-hpstr-metalsmith-theme
[7]: https://github.com/tjpeden/neo-hpstr-metalsmith-theme
[8]: http://disqus.com
[9]: https://developers.facebook.com/docs/opengraph
[10]: https://dev.twitter.com/docs/cards
[11]: https://github.com/tjpeden/neo-hpstr-metalsmith-theme
