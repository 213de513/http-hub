
const currentVersion = JSON.stringify(require('../../package.json').version)
const path = require('path')
function getProcessParams () {
  const params = process.argv.filter(item => item.indexOf('=') > -1)
  const obj = {}
  params.forEach(item => {
    const [key, value] = item.split('=') || []
    obj[key] = value
  })
  return obj
}

const { mode } = getProcessParams()

const IS_PRO = mode === 'production';
const is_test = mode === 'test';
const baseURL = IS_PRO ? '/f/http-hub-doc/' : is_test ? '/' : '/'
const STATIC_PATH = IS_PRO ? `/static/http-hub-doc/` : is_test ? '/' : '/'
const FaviconPath = IS_PRO ? `http://test.vis.github.cn/static/http-hub-doc/assets/favicon.ico` : is_test ? '/' : 'assets/favicon.ico'


module.exports = {
  head: [
    ['link', { rel: 'icon', href: FaviconPath, id: 'favicon' }]
  ],
  plugins: [
    [path.resolve(__dirname, './plugin/vuepress-plugin-extract-code')],
  ],
  alias () {
    return {
      '@img': path.resolve(__dirname, './public/assets'),
      '@': path.resolve(__dirname, '../../../doc')
    }
  },
  port: '9999',
  title: 'http-hub',
  dest: path.resolve(__dirname, '../docs-dist'),
  base: baseURL, // 输出站点根路由
  markdown: {
    lineNumbers: true // 显示行号
  },
  theme: require.resolve('./theme'), // 增加自定义主题
  themeConfig: {
    sidebar: {
      '/guide/': [
        {
          title: '介绍',
          path: '/guide/'
        },
        {
          title: '安装使用',
          path: '/guide/install/'
        },
        {
          title: '模块配置',
          path: '/guide/module/'
        },
        {
          title: '用法汇总',
          path: '/guide/usage/'
        },
        {
          title: '全局配置',
          path: '/guide/global-config/'
        }
      ],
      '/inner/': [
        'api',
        'errorTemp',
        'components'
      ],
      '/surrounding/': [
        'extension'
      ],
      '/other/': [
        'changelog/',
        'issue/',
      ],

    },
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      {
        text: '内置资源', items: [
          { text: 'API', link: '/inner/api.html' },
          { text: '异常模板', link: '/inner/errorTemp.html' },
          { text: '提示组件', link: '/inner/components.html' }
        ]
      },
      {
        text: '周边', items: [
          { text: 'vscode 扩展', link: '/surrounding/extension/' }
        ]
      },
      {
        text: '更新与反馈', items: [
          { text: '更新日志', link: '/other/changelog/' },
          { text: '反馈', link: '/other/issue/' }
        ]
      },

    ],
    lastUpdated: '上次更新'
  },
  define: {
    NODE_ENV: mode,
    __VERSION__: currentVersion
  },
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      config.output.publicPath = STATIC_PATH;
    }
  }
}