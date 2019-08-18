import BaseModel from './BaseModel'
export default class UnderLineTeachingPlan extends BaseModel {
    id = "";
    classType = "";
    trainName = "";
    trainTheme = "";
    classThink = "";
    contents = "";
    trainTime = "";
    trainPlace = '';
    trainObjects = '';
    userCount = '';
    sponsorOrganId = '';
    coOrganId = '';
    coAuditorUserId = '';
    relationKey = '';
    baseType = 1;
    collegesName = '';
    contacts = '';
    funds = '';
    organLifeType = '';
    isWei = '';
    isOpen = '';
    remarks = '';
    constructor(props = {}) {
        super();
        Object.assign(this, props);

    }
    static setModels(model) {
        let d = UnderLineTeachingPlan.getModel(model);
        d.isOpen = d.isOpen ? true : false;
        d.isWei = d.isWei ? true : false;
        return d;
    }
    static getModels(model) {
        let d = UnderLineTeachingPlan.getModel(model);
        d.classType = d.classType.toString();
        d.isOpen = d.isOpen ? 1 : 0;
        d.isWei = d.isWei ? 1 : 0;
        return d;
    }
    static getRules(context) {
        return {
            classType: [{
                required: true,
                trigger: 'change',
                message: '请选择班级类型'
            }],
            trainName: [{
                required: true,
                trigger: 'blur',
                message: '请输入培训名称'
            }],
            trainTheme: [{
                required: true,
                trigger: 'change',
                message: '请选择培训主题'
            }],
            classThink: [{
                required: true,
                trigger: 'blur',
                message: '请输入办班思路'
            }],
            contents: [{
                required: true,
                trigger: 'blur',
                message: '请输入培训内容'
            }],
            trainTime: [{
                required: true,
                trigger: 'change',
                message: '请选择培训时间',
                type: 'date'
            }],
            trainPlace: [{
                required: true,
                trigger: 'blur',
                message: '请输入培训地点'
            }],
            trainObjects: [{
                required: true,
                trigger: 'blur',
                message: '请输入培训对象'
            }],
            userCount: [{
                required: true,
                trigger: 'blur',
                type: 'integer',
                message: '请输入人数'
            }],
            sponsorOrganId: [{
                required: true,
                trigger: 'change',
                message: '请选择主办单位',
            }],
            organLifeType: [{
                required: true,
                trigger: 'change',
                message: '请选择关联组织生活',
            }],
            isWei: [{
                required: true,
                trigger: 'change',
                type: 'integer',
                message: '是否依托微党校开展',
            }],
            isOpen: [{
                required: true,
                trigger: 'change',
                type: 'integer',
                message: '是否公开',
            }]
        }
    }
}
