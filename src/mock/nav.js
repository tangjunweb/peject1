export default [{
    iconPath: '@/assets/images/login-bottom.png',
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
    }]
},


{
    iconPath: '@/assets/images/login-bottom.png',
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
    iconPath: '@/assets/images/login-bottom.png',
    displayName: '组织活动',
    url: '/organization',
    children: [{
        url: '/organization/organizationallife',
        iconPath: '@/assets/images/login-bottom.png',
        displayName: '组织生活',
        type: 1
    }, {
        url: '/organization/organizationalupload',
        iconPath: '@/assets/images/login-bottom.png',
        displayName: '组织生活上传管理',
        type: 1

    }]
},


{
    iconPath: '@/assets/images/login-bottom.png',
    displayName: '党建综合服务',
    url: 'basic',
    children: [{
        url: 'analyse',
        iconPath: '@/assets/images/login-bottom.png',
        displayName: '总体分析',
        type: 1
    }]
},


{
    iconPath: '@/assets/images/login-bottom.png',
    displayName: '系统设置',
    url: 'basic',
    children: [{
        url: 'analyse',
        iconPath: '@/assets/images/login-bottom.png',
        displayName: '总体分析',
        type: 1
    }]
},

]