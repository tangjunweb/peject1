import RouterComponent from '@/pages/router/router' //路由组件
export default [{
    path: 'organization',
    component: RouterComponent,
    meta: {
        title: '组织生活'
    },
    children: [{
            path: '/',
            redirect: 'organizationallife'
        },
        {
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
                        import ('@/pages/organization/organizationallife/home'),
                }
            ]
        },
        {
            path: 'manage',
            meta: {
                title: '我的组织生活'
            },
            component: RouterComponent,
            children: [{
                    path: '/',
                    redirect: 'home'
                },
                {
                    path: 'home',
                    // meta: {
                    //     title: '我的组织生活'
                    // },
                    component: () =>
                        import ('@/pages/organization/manage/home'),
                },
                {
                    path: 'detail',
                    meta: {
                        title: '组织生活详情'
                    },
                    name: '组织生活详情',
                    component: () =>
                        import ('@/pages/organization/manage'),
                },
                {
                    path: 'plain',
                    meta: {
                        title: '上传组织生活计划'
                    },
                    name: '上传组织生活计划',
                    component: () =>
                        import ('@/pages/organization/manage/plain'),
                },
                {
                    path: 'signup',
                    meta: {
                        title: '报名'
                    },
                    name: '填写报名',
                    component: () =>
                        import ('@/pages/organization/manage/signup'),
                }, {
                    path: 'signupselect',
                    meta: {
                        title: '报名'
                    },
                    name: '选择报名',
                    component: () =>
                        import ('@/pages/organization/manage/signupselect'),
                }, {
                    path: 'uploadactivity',
                    meta: {
                        title: '上传活动纪实'
                    },
                    name: '上传活动纪实',
                    component: () =>
                        import ('@/pages/organization/manage/uploadactivity'),
                },
            ],
        },
        {
            path: 'organizationalAplay',
            meta: {
                title: '组织生活审核管理'
            },
            component: RouterComponent,
            children: [{
                    path: '/',
                    redirect: 'organizationalAplay'
                },
                {
                    path: 'organizationalAplay',
                    component: () =>
                        import ('@/pages/organization/organizationalAplay')
                },
                {
                    path: 'aplay',
                    meta: {
                        title: '组织生活审核'
                    },
                    name: '组织生活审核',
                    component: () =>
                        import ('@/pages/organization/organizationalAplay/aplay')
                },
                {
                    path: 'detail',
                    meta: {
                        title: '查看详情'
                    },
                    name: '查看详情',
                    component: () =>
                        import ('@/pages/organization/manage')
                }, {
                    path: 'activityaudit',
                    meta: {
                        title: '审核活动纪实'
                    },
                    name: '审核活动纪实',
                    component: () =>
                        import ('@/pages/organization/organizationalAplay/activityaudit'),
                }
            ]


        }
    ]
}]