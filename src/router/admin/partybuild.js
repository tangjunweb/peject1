import RouterComponent from '@/pages/router/router' //路由组件
export default [{
    path: 'comprehensiveservice',
    component: RouterComponent,
    meta: {
        title: '党建综合服务'
    },
    children: [{
            path: '/',
            redirect: 'survey'
        },
        {
            path: 'survey',
            component: RouterComponent,
            children: [{
                    path: '/',
                    redirect: 'index'
                },
                {
                    path: 'index',
                    meta: {
                        title: '概况'
                    },
                    component: () =>
                        import ('@/pages/comprehensiveservice/survey'),
                }
            ]
        },
        {
            path: 'resource',
            meta: {
                title: '资源清单'
            },
            component: RouterComponent,
            children: [{
                    path: '/',
                    redirect: 'index'
                },
                {
                    path: 'index',
                    component: () =>
                        import ('@/pages/comprehensiveservice/resource/index'),
                },
                {
                    path: 'uploadresource',
                    meta: {
                        title: '上传资源清单'
                    },
                    name: '上传资源清单',
                    component: () =>
                        import ('@/pages/comprehensiveservice/resource/uploadresource'),
                },
                {
                    path: 'resourceAudit',
                    meta: {
                        title: '资源审核'
                    },
                    name: '资源审核',
                    component: () =>
                        import ('@/pages/comprehensiveservice/resource/resourceAudit'),
                },
                {

                    path: 'detail',
                    meta: {
                        title: '资源详情'
                    },
                    name: '资源详情',
                    component: () =>
                        import ('@/pages/comprehensiveservice/resource/detail'),
                }
            ],
        },
        {
            path: 'demand',
            meta: {
                title: '需求清单'
            },
            component: RouterComponent,
            children: [{
                    path: '/',
                    redirect: 'demand'
                },
                {
                    path: 'demand',
                    component: () =>
                        import ('@/pages/comprehensiveservice/demand')
                },
                {
                    path: 'uploaddemand',
                    meta: {
                        title: '上传需求清单'
                    },
                    name: '上传需求清单',
                    component: () =>
                        import ('@/pages/comprehensiveservice/demand/uploaddemand'),
                },
                {
                    path: 'demandAudit',
                    meta: {
                        title: '需求审核'
                    },
                    name: '需求审核',
                    component: () =>
                        import ('@/pages/comprehensiveservice/demand/demandAudit'),
                },
                {

                    path: 'detail',
                    meta: {
                        title: '需求详情'
                    },
                    name: '需求详情',
                    component: () =>
                        import ('@/pages/comprehensiveservice/demand/detail'),
                }
            ]


        },
        {
            path: 'task',
            meta: {
                title: '任务清单'
            },
            component: RouterComponent,
            children: [{
                    path: '/',
                    redirect: 'task'
                },
                {
                    path: 'task',
                    component: () =>
                        import ('@/pages/comprehensiveservice/task'),
                },
                {
                    path: 'lowerdev',
                    meta: {
                        title: '下发任务清单'
                    },
                    name: '下发任务清单',
                    component: () =>
                        import ('@/pages/comprehensiveservice/task/lowerdev'),
                },
                {
                    path: 'overtask',
                    meta: {
                        title: '完成任务清单'
                    },
                    name: '完成任务清单',
                    component: () =>
                        import ('@/pages/comprehensiveservice/task/overtask'),
                },
                {

                    path: 'detail',
                    meta: {
                        title: '任务详情'
                    },
                    name: '任务详情',
                    component: () =>
                        import ('@/pages/comprehensiveservice/task/detail'),
                }
            ],
        },
        {
            path: 'audit',
            meta: {
                title: '清单审核'
            },
            component: RouterComponent,
            children: [{
                    path: '/',
                    redirect: 'index'
                },
                {
                    path: 'index',
                    component: () =>
                        import ('@/pages/comprehensiveservice/audit/index'),
                },
                // {
                //     path: 'audit',
                //     meta: {
                //         title: '审核'
                //     },
                //     name: '审核',
                //     component: () =>
                //         import ('@/pages/comprehensiveservice/audit/audit'),
                // }
            ],
        }
    ]
}]