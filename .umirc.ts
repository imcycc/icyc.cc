import { defineConfig } from 'umi'

export default defineConfig({
  title: 'icyc.cc',
  favicon: '/favicon.png',
  // 静态资源路径
  publicPath: 'http://storage.icyc.cc/icyc/dist/',
  //开启按需加载
  dynamicImport: {
    loading: '@/components/PageLoading',
  },
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
        },
      },
    })
  },
  // 设置哪些模块可以不被打包，通过 <script> 或其他方式引入，通常需要和 scripts 或 headScripts 配置同时使用。
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    moment: 'window.moment',
    antd: 'window.antd',
  },
  scripts: [
    'https://unpkg.com/react@^16/umd/react.production.min.js',
    'https://unpkg.com/react-dom@^16/umd/react-dom.production.min.js',
    'https://unpkg.com/moment@^2/min/moment.min.js',
    'https://unpkg.com/antd@^4/dist/antd.min.js',
  ],
  styles: ['https://unpkg.com/antd@^4/dist/antd.min.css'],
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
