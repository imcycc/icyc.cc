import { defineConfig } from 'umi'

export default defineConfig({
  title: 'icyc.cc',
  favicon: '/favicon.png',
  // proxy: {
  //   '/api': {
  //     target: 'https://api.icyc.cc/',
  //     pathRewrite: { '^/api': '' },
  //     changeOrigin: true,
  //   },
  // },
  //开启按需加载
  dynamicImport: {},
  //开启按需加载后把 css 打包成一个文件
  chainWebpack(config) {
    config.optimization.splitChunks({
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|scss)$/,
          chunks: 'async',
          minChunks: 1,
          minSize: 0,
        }
      },
    });
  },
  //配置 externals 还能减小编译消耗
  externals: {
    'react': 'window.React',
    'react-dom': 'window.ReactDOM',
    'moment': 'window.moment',
    'antd': 'window.antd',
  },
  //启用后自动配置 babel-plugin-import实现antd按需加载  false 表示不开启  {} 表示开启
  antd: false,
  // 路由
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: '@/pages/Home',
      routes: [
        {
          path: '/home',
          component: '@/components/HomeArticleList',
        },
      ],
    },
    {
      path: '/article/:id',
      component: '@/pages/Article',
    },
    {
      path: '/write/:key',
      component: '@/pages/Write',
    },
    {
      path: '/admin',
      component: '@/pages/Admin',
      routes: [
        {
          path: '/admin',
          redirect: '/admin/articles',
        },
        {
          path: '/admin/articles',
          component: '@/components/Admin/Article',
        },
        {
          path: '/admin/tags',
          component: '@/components/Admin/Tag',
        },
        {
          path: '/admin/drafts',
          component: '@/components/Admin/Tag',
        },
      ],
    },
    {
      path: '/login',
      component: '@/pages/Login',
    },
    {
      component: '@/pages/404',
    },
  ],

})
