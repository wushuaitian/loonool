// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    host: '192.168.0.251',//自己电脑的Ip
    port: 3000,
  },

  runtimeConfig: {
    // 私有配置（仅在服务端可用）
    public: {
      apiBase: 'http://192.168.1.23:8030/'
    }
  },
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@element-plus/nuxt',
    '@nuxtjs/i18n',
  ],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  elementPlus: {
    // 选项
    importStyle: 'css',
    themes: ['dark'],
  },
  postcss: {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 16,
        propList: ['*'],
        exclude: /node_modules/i,
        selectorBlackList: ['.norem']
      },
      autoprefixer: {}
    }
  },
  i18n: {
    locales: [
      { code: 'zh', name: '中文' },
      { code: 'en', name: 'English' }
    ],
    defaultLocale: 'zh',
    // 路由策略
    strategy: 'prefix_except_default',
    // 检测浏览器语言
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },

    // Vue I18n 配置
    vueI18n: './i18n.config.ts'
  },
  // 标签页设置
  app: {
    head: {
      title: 'LOONOOL',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/img/logo.png' }
      ],
      meta: [
        { name: 'description', content: '网站描述' }
      ]
    }
  },
  // 禁用全局加载指示器
  // 禁用加载指示器
  features: {
    devLogs: false
  }
})
