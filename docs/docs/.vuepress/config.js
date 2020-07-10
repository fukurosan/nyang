const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'nyang',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Documentation',
        link: '/documentation/',
      },
      {
        text: 'Fukurosan',
        link: 'https://github.com/fukurosan'
      }
    ],
    sidebar: [
      {
        title: 'Getting Started',
        path: "/getting-started",
        collapsable: false,
        children: [
          '/getting-started/installation',
          '/getting-started/your-first-graph',
        ]
      },
      {
        title: 'Documentation',
        path: "/documentation",
        collapsable: false,
        children: [
          '/documentation/custom-styles',
          '/documentation/binding-data',
          '/documentation/event-listeners',
          '/documentation/filters',
          '/documentation/imploding-exploding',
          '/documentation/layout',
          '/documentation/highlight-search',
          '/documentation/multiplicity',
          '/documentation/zoom',
          '/documentation/updating-data',
          '/documentation/background-grid',
          '/documentation/fixed-label-width',
          '/documentation/hover-effects',
          '/documentation/context-menu',
          '/documentation/using-with-react',
        ]
      },
      {
        title: 'API Reference',
        path: "/api-reference",
        collapsable: false,
        children: [
          '/api-reference/api-reference',
        ]
      }
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ],
  base: "/nyang/docs/dist/"
}
