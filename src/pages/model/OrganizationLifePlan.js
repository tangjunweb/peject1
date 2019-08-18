import BaseModel from './BaseModel'
export default class OrganizationLifePlan extends BaseModel {
    id = "";
    title = "";
    year = "";
    quarte = "";
    month = "";
    address = "";
    isFixedDay = false;
    startTime = '';
    endTime = '';
    timeType = '1';
    PartyMeetingPlanId='';
    meetingPlanDetailsDtos = []
    constructor(props = {}) {
        super();
        Object.assign(this, props);
    }
    static setModels(model) {
      
        console.log(model)
        let d = OrganizationLifePlan.getModel(model);

        d.meetingPlanDetailsDtos.map(e => {
            if (e.operUser&&e.operUser.id && e.operUser.name) {
                e.operUserId = e.operUser.id;
                e.operUserName = e.operUser.name;
                delete e.operUser
            }
           
            e.meetingPlanDetailsUsersDtos.map(i => {
                // i.userId = i.id
                // delete i.id
            })
        })
       
        return d;
    }
    static getModels(model) {
        
        let d = OrganizationLifePlan.getModel(model);
        d.meetingPlanDetailsDtos.map(e => {
            if (e.operUserId && e.operUserName) {
                e.operUser = {};
                e.operUser.id = e.operUserId;
                e.operUser.name = e.operUserName;
                delete e.operUserId
                // e.operUserName
            }
        })
        if (d.quarte) {
            d.timeType = '2'
        } else if (d.month) {
            d.timeType = '1';
        } else {
            d.timeType = '3';
        }
        d.startTime = model.startTime;
        return d;
    }
    static getRules(context) {
        return {
            title: [{
                required: true,
                trigger: 'blur',
                message: '请输入会议标题'
            }],
            year: [{
                required: true,
                type: 'date',
                trigger: 'change',
                message: '请选择年份',
            }],
            month: [{
                required: true,
                type: 'date',
                trigger: 'change',
                message: '请选择月份',
            }],
            quarte: [{
                required: true,
                trigger: 'change',
                message: '请选择季度'
            }],
            timeType: [{
                required: true,
                trigger: 'change',
                message: '请选择计划时间类型'
            }],
            address: [{
                required: true,
                trigger: 'change',
                message: '请选择地址'
            }],
            startTime: [{
                required: true,
                trigger: 'change',
                message: '请选择开始时间',
                pattern: /.+/
            }, {
                validator(rule, value, callback) {
                    if (value && context.model.endTime) {
                        let st = (new Date(context.FormatDate(context.model.endTime, 'yyyy/MM/dd hh:mm:ss'))).getTime();
                        let ct = (new Date(value)).getTime();
                        if (ct > st) {
                            callback(new Error('开始时间不能晚于结束时间'));
                        } else {
                            callback();
                        }
                    } else {
                        callback();
                    }
                }
            }],
            endTime: [{
                required: true,
                trigger: 'change',
                message: '请选择结束时间',
                pattern: /.+/
            }, {
                validator(rule, value, callback) {
                    if (value && context.model.startTime) {
                        let st = (new Date(context.FormatDate(context.model.startTime, 'yyyy/MM/dd hh:mm:ss'))).getTime();
                        let ct = (new Date(value)).getTime();
                        if (ct < st) {
                            callback(new Error('开始时间不能晚于结束时间'));
                        } else {
                            callback();
                        }
                    } else {
                        callback();
                    }
                }
            }],
        }
    }
}
