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
