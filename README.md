# [Neo-HPSTR Metalsmith Theme][6]

[![GitHub Version][3]][4]

Neo-HPSTR Metalsmith is a responsive and modern blog template based on [Neo-HPSTR Jekyll][1]

![Preview][5]

[Demo][6]

## Contents

- [Installation](#installation)
- [Features](#features)
- [Configuration](#configuration)
- [License](#license)

## Installation

### Boilerplate / Fork

1. [Fork the repo][7]
1. Clone the fork locally (`git clone git@github.com:username/reponame.git`)
1. Delete the stock posts and images
1. Install NPM modules (`npm install`)
1. Build into `/build` with `node .` OR `gulp`
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

## gulp build
`gulp` is the prefered way to build, as it is faster. Tasks are executed in parallel. Most metalsmith plugins are just wrapped gulp plugins.

However, for compatibility reasons `node .` still works as well.

### usage
`gulp` to build the blog into `/build`, and start it in a browser window

`gulp build` to just build the blog (to `build`)

`gulp browser-sync` to build and view it in a browser window (same as `gulp`, but without cleaning the build directory first)

`gulp clean` to clean the build-directory for a fresh rebuild

## Configuration

Here are some tips on how to customize your blog theme. If you have questions, just open a new issue. :)

Configure the bolg's metadata in ./configuration/metadata.js file.

### Project tree

├── LICENSE
├── README.md
├── gulpfile.js                     # main build file, using `gulp`
├── index.js                        # main build file, using `node .`
├──configuration/                   # configuration for the blog
    ├── config.js                   # build configuration
    └── metadata.js                 # blog metadata
├── gulp                            # configuration and tasks for gulp
│   ├── config.js                   # blog configuration
│   └── tasks                       # individual gulp tasks
│       ├── browser-sync.js         # view locally built blog in browser
│       ├── build.js                # main task to build the blog
│       └── watch.js                # rebuild on file changes
├── package.json                    # package dependencies, install with `npm install`
└── src                             # all sources needed for the build process
    ├── assets                      # assets to be copied unprocessed to `/build`
    │   ├── fonts/                  # fonts (i.e. FontAwesome)
    │   ├── images/                 # images (i.e. logo, favicon, etc)
    │   ├── javascripts/            # third-party and page specific js
    │   ├── stylesheets/            # css (not compiled)
    ├── helpers/                    # handlebars helpers
    ├── layouts/                    # blog layouts
    │   ├── home.html
    │   ├── page.html
    │   └── post.html
    ├── partials/
    │   ├── author.hbs              # author banner (at the end of post)
    │   ├── disqus-comments.hbs     # comments
    │   ├── footer.hbs              # page footer
    │   ├── head.hbs                # site head, with css includes and metadata
    │   ├── header.hbs              # header menu
    │   ├── icons.hbs               # site icons
    │   ├── pagination.hbs          # pagination
    │   ├── read-more.hbs           # read-more banner, to recommend posts
    │   ├── scripts.hbs             # js scripts
    │   └── social-share.hbs        # floating social share integration
    └── process                     # files to process
        ├── 404.html.hbs            # 404 page
        ├── _posts                  # blog posts
        ├── about/index.md          # about page
        ├── assets/stylesheets      # blog style; scss to be compiled to /build/assets/stylesheets
        ├── index.html.hbs          # home page
        ├── posts/index.html.hbs    # archives page
        └── search/index.html.hbs   # search page


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
