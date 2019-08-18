import BaseModel from './BaseModel'
export default class TeachingPlan extends BaseModel {
    id = "";
    title = "";
    subject = "";
    year = "";
    quarte = "";
    month = "";
    teacthingMethod = "";
    teachingObjects = [];
    organIdList = [];
    startTime = '';
    endTime = '';
    timeType = '1';
    includeAll = true;
    constructor(props = {}) {
        super();
        Object.assign(this, props);
        if (typeof this.teachingObjects === 'string') {
            this.teachingObjects = this.teachingObjects.split(',');
        }
        if (this.planScopes) {
            this.organIdList = this.planScopes.map(e => e.organId)
        }
    }
    static getRules(context) {
        return {
            title: [{
                required: true,
                trigger: 'blur',
                message: '请输入教学主题'
            }],
            teacthingMethod: [{
                required: true,
                trigger: 'change',
                message: '请选择教学方式'
            }],
            timeType: [{
                required: true,
                trigger: 'change',
                message: '请选择教学计划时间类型'
            }],
            year: [{
                required: true,
                trigger: 'change',
                message: '请选择年份',
                type: 'date'
            }],
            month: [{
                required: true,
                trigger: 'change',
                message: '请选择月份',
                type: 'date'
            }],
            quarte: [{
                required: true,
                trigger: 'change',
                message: '请选择季度'
            }],
            organIdList: [{
                required: true,
                message: '请选择党组织'
            }],
            teachingObjects: [{
                required: true,
                type: 'array',
                trigger: 'change',
                message: '请选择教学对象'
            }],
            startTime: [{
                trigger: 'change',
                validator(rule, value, callback) {
                    if (value && context.model.endTime) {
                        let st = (new Date('1990/01/01 ' + context.model.endTime)).getTime();
                        let ct = (new Date('1990/01/01 ' + value)).getTime();
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
                trigger: 'change',
                validator(rule, value, callback) {
                    if (value && context.model.startTime) {
                        let st = (new Date('1990/01/01 ' + context.model.startTime)).getTime();
                        let ct = (new Date('1990/01/01 ' + value)).getTime();
                        if (ct < st) {
                            callback(new Error('结束时间不能早于开始时间'));
                        } else {
                            callback();
                        }
                    } else {
                        callback();
                    }
                }
            }]
        }
    }
}
