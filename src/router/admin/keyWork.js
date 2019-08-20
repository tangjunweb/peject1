import RouterComponent from '@/pages/router/router' //路由组件
export default [{
    path: 'keyWork',
    meta: {
        title: '重点工作监督即时'
    },
    component: RouterComponent,
    children: [{
            path: '/',
            redirect: 'all',
        },
        {
            path: 'all',
            component: RouterComponent,
            meta: {
                title: '总览'
            },
            children: [{
                path: '/',
                redirect: {
                    path: 'index'
                }
            }, {
                path: 'index',
                component: () =>
                    import ('@/pages/keyWork/all')
            }]
        },
        {
            path: 'devwork',
            component: RouterComponent,
            meta: {
                title: '发展党员工作',
            },
            children: [{
                    path: '/',
                    redirect: 'devwork'
                },
                {
                    path: 'devwork',
                    component: () =>
                        import ('@/pages/keyWork/devwork/devwork')

                },
                {
                    path: 'create',
                    name: '加入党积极分子',
                    component: () =>
                        import ('@/pages/keyWork/devwork/create'),
                    meta: {
                        title: '加入党积极分子',
                    },
                }
            ]
        },
        {
            path: 'summary',
            component: RouterComponent,
            meta: {
                title: '汇总',
            },
            children: [{
                    path: '/',
                    redirect: 'index'
                }, {
                    path: 'index',
                    component: () =>
                        import ('@/pages/keyWork/summary/index')
                },
                {
                    path: 'detail',
                    name: '汇总详情',
                    component: () =>
                        import ('@/pages/keyWork/summary/detail'),
                    meta: {
                        title: '汇总详情',
                    },
                }
            ]
        },
        {
            path: 'partyLife',
            component: RouterComponent,
            meta: {
                title: '党支部组织生活',
            },
            children: [{
                    path: '/',
                    redirect: 'index'
                }, {
                    path: 'index',
                    component: () =>
                        import ('@/pages/keyWork/partyLife/index')
                },
                {
                    path: 'detail',
                    name: '党支部组织生活详情',
                    component: () =>
                        import ('@/pages/keyWork/partyLife/detail'),
                    meta: {
                        title: '党支部组织生活详情',
                    },
                }
            ]
        }
    ]
}]