import RouterComponent from '@/pages/router/router' //路由组件
export default [{
  path: 'basic',
  meta: {
    title: '平台概况'
  },
  component: RouterComponent,
  children: [
    {
      path: '/',
      redirect: 'analyse',
    },
    {
      path: 'analyse',
      meta: {
        title: '总体分析'
      },
      component: () => import(/* webpackChunkName: "basic-analyse" */'@/pages/basic/analyse'), //平台分析
    },
    {
      path: 'organizational-space',
      meta: {
        title: '组织空间'
      },
      component: () => import(/* webpackChunkName: "basic-space" */'@/pages/basic/organizational-space'), //组织空间
    }
  ]
}]
