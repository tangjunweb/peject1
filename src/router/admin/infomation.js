import RouterComponent from '@/pages/router/router' //路由组件
export default [{
  path: 'information',
  meta: {
    title: '组织管理'
  },
  component: RouterComponent,
  children: [
    {
      path: '/',
      redirect: 'party-member',
    },
    {
      path: 'party-member',
      component: RouterComponent,
      meta: {
        title: '党员'
      },
      children: [{
        path: '/',
        redirect: {
          path: 'home'
        }
      }, {
        path: 'home',
        component: () => import(/* webpackChunkName: "manager-party-home" */ '@/pages/information/party-member'),
      }, {
        path: 'create',
        component: () => import(/* webpackChunkName: "manager-party-create" */ '@/pages/information/party-member/create'),
        meta: {
          title: '新增党员',
        },
      }, {
        path: 'info',
        component: () => import(/* webpackChunkName: "manager-party-info" */ '@/pages/information/party-member/info'),
        meta: {
          title: '党员详情',
        },
      },
      {
        path: 'edit',
        component: () => import(/* webpackChunkName: "manager-party-create" */ '@/pages/information/party-member/edit'),
        meta: {
          title: '编辑党员',
        },
      },
      {
        path: 'audit',
        component: () => import(/* webpackChunkName: "manager-party-audit" */ '@/pages/information/party-member/audit'),
        meta: {
          title: '账号转移',
        },
      },
      {
        path: 'history',
        component: () => import(/* webpackChunkName: "manager-party-history" */ '@/pages/information/party-member/history'),
        meta: {
          title: '转接历史',
        },
      }]
    },
    {
      path: 'organization',
      component: RouterComponent,
      meta: {
        title: '党组织',
      },
      children: [
        {
          path: '/',
          redirect: 'home',
        },
        {
          path: 'home',
          component: () => import(/* webpackChunkName: "manager-organization-home" */ '@/pages/information/organization'),
        },
        {
          path: 'create',
          component: () => import(/* webpackChunkName: "manager-organization-create" */ '@/pages/information/organization/create'),
          meta: {
            title: '新增党组织',
          },

        },
        {
          path: 'update',
          component: () => import( /* webpackChunkName: "manager-organization-create" */ '@/pages/information/organization/create'),
          meta: {
            title: '编辑党组织',
          }
        },
        {
          path: 'createunit',
          component: () => import( /* webpackChunkName: "manager-organization-createunit" */ '@/pages/information/organization/createunit'),
          meta: {
            title: '新建单位',
          }
        }, {
          path: 'editunit',
          component: () => import( /* webpackChunkName: "manager-organization-createunit" */ '@/pages/information/organization/createunit'),
          meta: {
            title: '编辑单位',
          }
        }, {
          path: 'info',
          component: () => import( /* webpackChunkName: "manager-organization-info" */ '@/pages/information/organization/info')
        }, {
          path: 'organinfo',
          component: () => import( /* webpackChunkName: "manager-organization-organinfo" */ '@/pages/information/organization/organinfo'),
          meta: {
            title: '党组织信息'
          },
        }, {
          path: 'organaudited',
          component: () => import( /* webpackChunkName: "manager-organization-organaudited" */ '@/pages/information/organization/organaudited'),
          meta: {
            title: '待审核党组织',
          }
        }, {
          path: 'unitaudited',
          component: () => import( /* webpackChunkName: "manager-organization-unitaudited" */ '@/pages/information/organization/unitaudited'),
          meta: {
            title: '待审核单位'
          },
        }, {
          meta: {
            title: '待审核单位详情'
          },
          path: 'unitinfo',
          component: () => import( /* webpackChunkName: "manager-organization-unitinfo" */ '@/pages/information/organization/unitinfo')
        }
      ]
    }, {
      path: 'notice',
      component: RouterComponent,
      meta: {
        title: '通知公告'
      },
      children: [
        {
          path: '/',
          redirect: 'home',
        },
        {
          path: 'home',
          component: () => import(/* webpackChunkName: "information-notice" */ '@/pages/information/notice'),
        },
        {
          path: 'create',
          meta: {
            title: '新增通知公告'
          },
          component: () => import(/* webpackChunkName: "information-notice" */ '@/pages/information/notice/create'),
        },
        {
          path: 'edit',
          meta: {
            title: '编辑通知公告'
          },
          component: () => import(/* webpackChunkName: "information-notice" */ '@/pages/information/notice/create'),
        }
      ]
    },
    {
      path: 'score',
      component: () => import(/* webpackChunkName: "information-score" */ '@/pages/information/score'),
      meta: {
        title: '积分管理'
      },
      children: [
        {
          path: '/',
          redirect: 'member'
        },
        {
          path: 'member',
          component: () => import(/* webpackChunkName: "information-score" */ '@/pages/information/score/member'),
        },

        {
          path: 'organization',
          component: () => import(/* webpackChunkName: "information-score" */ '@/pages/information/score/organization'),
        }
      ]
    }
  ]
}]
