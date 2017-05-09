const config = require('./config');


module.exports = {
  site: {
    // Site Info
    title: "Patrick Mukherjee",
    description: "Dr.-Ing.",
    url: process.env.NODE_ENV === 'production' ? "config.publish.url" : 'file:///'+config.dir.dest,

    reading_time: true,
    words_per_minute: 200,

    disqus: '',
    google_analytics: '',

    // Site Locale Info
    timezone: 'Germany/Berlin',
    locale: 'en_US',

    // Site Menu
    menu: [{
      title: 'GitHub',
      url: '#',
      submenu: [{
        title: 'Install',
        url: "https://github.com/patmuk/neo-hpstr-metalsmith-gulp-theme#installation",
      }, {
        title: 'Fork',
        url: "https://github.com/patmuk/neo-hpstr-metalsmith-gulp-theme",
      }]
    }, {
      title: 'About',
      url: '/about',
    }, {
      title: 'Archive',
      url: '/posts',
    }, {
      title: 'Home',
      url: '/',
    }],

    // Generator Info
    generator: {
      name: 'Matalsmith',
      url: "http://www.metalsmith.io/",
    },

    // Theme Info
    theme: {
      name: 'Neo-HPSTR Metalsmith Theme',
      url: "https://github.com/tjpeden/neo-hpstr-metalsmith-theme",
    },

    // Owner Info
    owner: {
      name: "Patrick Mukherjee",
      url: "http://patrick.mukherjee.de",
      bio: "Your bio goes here. It shouldn't be super long, but a good couple of sentences should suffice.",
      email: "patrick@mukherjee.de",
      twitter: 'patmuk',
      networks: [{
        name: 'GitHub',
        icon: 'github-alt',
        url: "https://github.com/patmuk",
      }, {
        name: 'CodePen',
        icon: 'codepen',
        url: "http://codepen.io/patmuk/",
      }, {
        name: 'Facebook',
        icon: 'facebook-official',
        url: "https://www.facebook.com/patrick.mukherjee",
      }, {
        name: 'Twitter',
        icon: 'twitter',
        url: "https://twitter.com/patmuk",
      }, {
        name: 'LinkedIn',
        icon: 'linkedin',
        url: "https://www.linkedin.com/in/patrick.mukherjee",
      }, {
        name: 'YouTube',
        icon: 'youtube-play',
        url: "https://www.youtube.com/patmuk",
      }, {
        name: 'Twitch',
        icon: 'twitch',
        url: "https://www.twitch.tv/patmuk",
      }],
    },
  }
}
