import RouterComponent from '@/pages/router/router' //路由组件
export default [{
    path: 'setting',
    meta: {
        title: '系统设置'
    },
    component: RouterComponent,
    children: [{
            path: '/',
            redirect: 'roles',
        },
        {
            path: 'project',
            meta: {
                title: '项目管理'
            },
            component: () =>
                import ( /* webpackChunkName: "settings-project" */ '@/pages/setting/project'), //菜单管理
        },
        {
            path: 'roles',
            component: RouterComponent,
            meta: {
                title: '角色权限管理'
            },
            children: [{
                path: '/',
                redirect: {
                    path: 'home'
                }
            }, {
                path: 'home',
                component: () =>
                    import ( /* webpackChunkName: "settings-roles" */ '@/pages/setting/roles'),
            }, {
                path: 'create',
                component: () =>
                    import ( /* webpackChunkName: "settings-roles" */ '@/pages/setting/roles/create'),
                meta: {
                    title: '新建角色',
                },
            }, {
                path: 'update',
                component: () =>
                    import ( /* webpackChunkName: "settings-roles" */ '@/pages/setting/roles/create'),
                meta: {
                    title: '编辑角色',
                },
            }]
        },
        {
            path: 'menu',
            meta: {
                title: '菜单权限管理'
            },
            component: () =>
                import ( /* webpackChunkName: "settings-menu" */ '@/pages/setting/menu'), //菜单管理
        },
        {
            path: 'manager',
            meta: {
                title: '管理员管理'
            },
            component: () =>
                import ( /* webpackChunkName: "settings-manager" */ '@/pages/setting/manager'), //管理员管理
        },
        {
            path: 'score-role',
            meta: {
                title: '积分规则管理'
            },
            component: () =>
                import ( /* webpackChunkName: "settings-score" */ '@/pages/setting/score-role'), //积分规则管理
        },
        {
            path: 'assessment-settings',
            component: RouterComponent,
            children: [{
                    path: '/',
                    redirect: 'home'
                },
                {
                    path: 'home',
                    meta: {
                        title: '党员考核设置'
                    },
                    component: () =>
                        import ( /* webpackChunkName: "settings-assessment" */ '@/pages/setting/assessmentsettings'),
                },
                {
                    path: 'create',
                    meta: {
                        title: '党员考核编辑'
                    },
                    component: () =>
                        import ( /* webpackChunkName: "settings-assessment" */ '@/pages/setting/assessmentsettings/create'),
                },
            ]
        },
        {
            path: 'code-manage',
            meta: {
                title: '码表管理'
            },
            component: () =>
                import ( /* webpackChunkName: "settings-code" */ '@/pages/setting/code'), //码表管理
        },
        {
            path: 'code-type',
            meta: {
                title: '码表类型管理'
            },
            component: () =>
                import ( /* webpackChunkName: "settings-code" */ '@/pages/setting/code-type'), //码表管理
        },
    ]
}]