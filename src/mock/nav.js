export default [{
        iconPath: 'basic',
        displayName: '平台概况',
        url: '/basic',
        children: [{
                url: '/basic/analyse',
                displayName: '总体分析',
                type: 1
            },
            {
                url: '/basic/organizational-space',
                displayName: '组织空间',
                type: 1
            }
        ]
    },


    {
        iconPath: 'keywork',
        displayName: '重点工作监督即时',
        url: '/keyWork',
        children: [{
            url: '/keyWork/all',
            displayName: '总览',
            type: 1
        }, {
            url: '/keyWork/devwork',
            displayName: '发展党员工作',
            type: 1
        }, {
            url: '/keyWork/summary',
            displayName: '汇总',
            type: 1
        }, {
            url: '/keyWork/partyLife',
            displayName: '党支部组织生活',
            type: 1
        }]
    },


    {
        iconPath: 'organization',
        displayName: '组织生活',
        url: '/organization',
        children: [{
            url: '/organization/organizationallife',
            displayName: '总览',
            type: 1
        }, {
            url: '/organization/manage/home',
            displayName: '我的组织生活',
            type: 1

        }, {
            url: '/organization/organizationalAplay',
            displayName: '组织生活审核管理',
            type: 1

        }]
    },


    {
        iconPath: 'partybuild',
        displayName: '党建综合服务',
        url: '/comprehensiveservice',
        children: [{
            url: '/comprehensiveservice/survey',
            displayName: '概况',
            type: 1
        }, {
            url: '/comprehensiveservice/resource',
            displayName: '资源清单',
            type: 1
        }, {
            url: '/comprehensiveservice/demand',
            displayName: '需求清单',
            type: 1
        }, {
            url: '/comprehensiveservice/task',
            displayName: '任务清单',
            type: 1
        }, {
            url: '/comprehensiveservice/audit',
            displayName: '清单审核',
            type: 1
        }]
    },


    {
        iconPath: 'setting',
        displayName: '系统设置',
        url: 'basic',
        children: [{
            url: 'analyse',
            displayName: '总体分析',
            type: 1
        }]
    },

]