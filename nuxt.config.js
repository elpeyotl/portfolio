module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: 'Chris Perez',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Portfolio Page Chris Perez' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.8/css/all.css'}
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/91/three.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.4/TweenMax.min.js' }
    ],
  },
  css: [
    '~/assets/css/base.css',
    '~/assets/css/demo2.css'
  ],
  modules: [
    '@nuxtjs/pwa',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
