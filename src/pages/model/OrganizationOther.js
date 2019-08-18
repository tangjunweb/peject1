import BaseModel from "./BaseModel";
class Penalty extends BaseModel {
    id = '';
    organId = '';
    bonnusPenaltyName = '';
    approvalDate = '';
    approvalOrganId = '';
    accordingAttach = {
        id: '',
        type: 10001,
        name: '',
        path: '',
        size: ''
    };
    constructor (props = {}) {
        super();
        Object.assign(this,props);
    }
    static getRules () {
        return {
            bonnusPenaltyName: [{
                required: true,
                message: '请选择奖惩名称',
                trigger: 'change'
            }],
            approvalDate: [{
                required: true,
                message: '请选择批准时间',
                type: 'date',
                trigger: 'change'
            }],
            approvalOrganId: [{
                required: true,
                message: '请选择批准组织',
                trigger: 'change'
            }],
            'accordingAttach.id': [{
                required: true,
                message: '请上传奖惩依据',
                trigger: 'change'
            }]
        }
    }
}
class Replacement extends BaseModel {
    id = '';
    organId = '';
    teamTime = '';
    produceWay = '';
    eletedDate = '';
    expiryDate = '';
    isCurrentTeamTime = true;
    meetingUserCount = 0;
    constructor (props = {}) {
        super();
        Object.assign(this,props);
    }
    static getRules () {
        return {
            teamTime: [{
                required: true,
                message: '请输入班子届次',
                trigger: 'blur'
            }],
            produceWay: [{
                required: true,
                message: '请选择产生方式',
                trigger: 'change'
            }],
            eletedDate: [{
                required: true,
                message: '请选择当选日期',
                type: 'date',
                trigger: 'change'
            }],
            expiryDate: [{
                required: true,
                message: '请选择届满日期',
                trigger: 'change',
                type: 'date'
            }],
            meetingUserCount: [{
                required: true,
                message: '请输入选举应到会人数',
                trigger: 'blur'
            }]
        }
    }
}
class Assessment extends BaseModel {
    id = '';
    organId = '';
    assessDate = '';
    attachs = [{
        id: '',
        type: 10001,
        name: '',
        path: '',
        size: ''
    },{
        id: '',
        type: 10002,
        name: '',
        path: '',
        size: ''
    },{
        id: '',
        type: 10003,
        name: '',
        path: '',
        size: ''
    },{
        id: '',
        type: 10004,
        name: '',
        path: '',
        size: ''
    },{
        id: '',
        type: 10005,
        name: '',
        path: '',
        size: ''
    }];
    constructor (props = {}) {
        super();
        Object.assign(this,props);
    }
    static getRules () {
        return {
            assessDate: [{
                required: true,
                message: '请选择考核时间',
                trigger: 'change',
                type: 'date'
            }]
        }
    }
}
export { Penalty, Replacement ,Assessment }
