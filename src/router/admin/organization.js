import RouterComponent from '@/pages/router/router' //路由组件
export default [{
    path: 'organization',
    component: RouterComponent,
    meta: {
        title: '组织活动'
    },
    children: [{
            path: '/',
            redirect: 'organizationallife'
        },
        {
            meta: {
                title: '组织生活'
            },
            path: 'organizationallife',
            component: RouterComponent,
            children: [{
                    path: '/',
                    redirect: 'home'
                },
                {
                    path: 'home',
                    meta: {
                        title: '总览'
                    },
                    component: () =>
                        import ( /* webpackChunkName: "organizationallife" */ '@/pages/organization/organizationallife/home'),
                },
                {
                    path: 'manage',
                    meta: {
                        title: '组织生活管理'
                    },
                    component: RouterComponent,
                    children: [
                        {
                        path: 'detail',
                        meta: {
                            title: '组织生活详情'
                        },
                        component: () => import('@/pages/organization/manage'),
                    },
                    {
                        path: 'plain',
                        meta: {
                            title: '上传组织生活计划'
                        },
                        component: () => import('@/pages/organization/manage/plain'),
                    }
                ],
                },

                {
                    path: 'manager',
                    component: RouterComponent,
                    children: [{
                            path: '/',
                            redirect: 'info'
                        },
                        {
                            path: 'create',
                            component: () =>
                                import ( /* webpackChunkName: "organizationallife-manager" */ '@/pages/organization/organizationallife/manager/create'),
                            meta: {
                                title: '新增组织生活'
                            }
                        }, {
                            path: 'update',
                            component: () =>
                                import ( /* webpackChunkName: "organizationallife-manager" */ '@/pages/organization/organizationallife/manager/create'),
                            meta: {
                                title: '修改组织生活'
                            }
                        },
                        {
                            path: 'info',
                            meta: {
                                title: '组织生活管理'
                            },
                            component: () =>
                                import ( /* webpackChunkName: "organizationallife-manager" */ '@/pages/organization/organizationallife/manager/info')
                        },
                        {
                            path: 'list',
                            meta: {
                                title: '组织生活管理列表'
                            },
                            component: () =>
                                import ( /* webpackChunkName: "organizationallife-manager" */ '@/pages/organization/organizationallife/manager/list')
                        }, {
                            path: 'meetinginfo',
                            meta: {
                                title: '会议详情'
                            },
                            component: () =>
                                import ( /* webpackChunkName: "organizationallife-manager" */ '@/pages/organization/organizationallife/manager/meetinginfo')
                        },
                        {
                            path: 'distributive',
                            meta: {
                                title: '分配参会人员'
                            },
                            component: () =>
                                import ( /* webpackChunkName: "organizationallife-manager" */ '@/pages/organization/organizationallife/manager/distributive')
                        },
                        {
                            path: 'meetingOffWork',
                            meta: {
                                title: '请假审批'
                            },
                            component: () =>
                                import ( /* webpackChunkName: "organizationallife-manager" */ '@/pages/organization/organizationallife/manager/meetingOffWork')
                        },
                    ]
                },
                {
                    path: 'plan',
                    component: RouterComponent,
                    meta: {
                        title: '组织生活计划制定'
                    },
                    children: [{
                            path: '/',
                            redirect: 'home'
                        }, {
                            path: 'home',
                            component: () =>
                                import ( /* webpackChunkName: "organizationallife-plan" */ '@/pages/organization/organizationallife/plan'),
                        },
                        {
                            path: 'create',
                            meta: {
                                title: '新增组织生活计划'
                            },
                            component: () =>
                                import ( /* webpackChunkName: "organizationallife-plan" */ '@/pages/organization/organizationallife/plan/create'),
                        },
                        {
                            path: 'meetinginfo',
                            meta: {
                                title: '组织生活计划详情'
                            },
                            component: () =>
                                import ( /* webpackChunkName: "organizationallife-plan" */ '@/pages/organization/organizationallife/plan/create'),
                        }
                    ]
                }
            ]
        },
        {
            path: 'organizationalupload',
            meta: {
                title: '组织生活上传管理'
            },
            component: () =>
                import ('@/pages/organization/organizationalupload')

        },
        {
            path: 'organizationalAplay',
            meta: {
                title: '组织生活审核管理'
            },
            component: () =>
                import('@/pages/organization/organizationalAplay')

        },
        {
            path: 'forum',
            component: RouterComponent,
            children: [{
                    path: '/',
                    redirect: 'home'
                },
                {
                    path: 'home',
                    meta: {
                        title: '活动互动'
                    },
                    component: () =>
                        import ( /* webpackChunkName: "organizationa-forum" */ '@/pages/organization/forum'),
                },
                {
                    path: 'info',
                    meta: {
                        title: '活动互动详情'
                    },
                    component: () =>
                        import ( /* webpackChunkName: "organizationa-forum" */ '@/pages/organization/forum/info'),
                },
                {
                    path: 'create',
                    meta: {
                        title: '发起活动互动'
                    },
                    component: () =>
                        import ( /* webpackChunkName: "organizationa-forum" */ '@/pages/organization/forum/create'),
                },

                {
                    path: 'update',
                    meta: {
                        title: '修改活动互动'
                    },
                    component: () =>
                        import ( /* webpackChunkName: "organizationa-forum" */ '@/pages/organization/forum/create'),
                },
                {
                    path: 'vote',
                    meta: {
                        title: '投票管理'
                    },
                    component: () =>
                        import ( /* webpackChunkName: "organizationa-forum" */ '@/pages/organization/forum/vote'),
                },
            ]
        },
        {
            path: 'suggestion',
            component: RouterComponent,
            meta: {
                title: '意见建议'
            },
            children: [{
                    path: '/',
                    redirect: 'home'
                },
                {
                    path: 'home',
                    component: () =>
                        import ( /* webpackChunkName: "organizationa-suggestion" */ '@/pages/organization/suggestion'),
                },
                {
                    path: 'examine',
                    meta: {
                        title: '待处理',
                    },
                    component: () =>
                        import ( /* webpackChunkName: "organizationa-suggestion" */ '@/pages/organization/suggestion/examine'),
                },
                {
                    path: 'info',
                    meta: {
                        title: '详情',
                    },
                    component: () =>
                        import ( /* webpackChunkName: "organizationa-suggestion" */ '@/pages/organization/suggestion/info'),
                }
            ]
        }
    ]
}]