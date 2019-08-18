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
                    import ( /* webpackChunkName: "manager-party-home" */ '@/pages/keyWork/all')
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
                    redirect: 'devwork',
                },
                {
                    path: 'devwork',
                    component: () =>
                        import ( /* webpackChunkName: "manager-organization-home" */ '@/pages/keyWork/devwork/devwork'),
                },
                {
                    path: 'create',
                    component: () =>
                        import ( /* webpackChunkName: "manager-organization-create" */ '@/pages/keyWork/devwork/create'),
                    meta: {
                        title: '新增党员',
                    },
                }
            ]
        }
    ]
}]