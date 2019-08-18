import BaseModel from './BaseModel'
export default class TrainClass extends BaseModel {
    id = "";
    className = "";
    coverPicture = "";
    group = "";
    classType = "";
    teachingObjects = [];
    publicMark = true;
    publicScopeOrganId = "";
    teachingPlanId = "";
    teachingPlanName = "";
    applyStartTime = "";
    applyEndTime = "";
    startTime = "";
    endTime = "";
    managedOrganId = "";
    scopeList = [];
    isEvaluation = false;
    constructor(props = {}) {
        super();
        Object.assign(this, props);
        if (typeof this.teachingObjects === 'string') {
            this.teachingObjects = this.teachingObjects.split(',');
        }
    }
    getScopeItem() {
        return {
            organId: '',
            limitCount: 0
        }
    }
    static getModels(model) {
        let d = TrainClass.getModel(model);
        if (d.teachingObjects) {
            d.teachingObjects = d.teachingObjects.join(',');
        }
        return d;
    }
    static getRules(context) {
        return {
            className: [{
                required: true,
                trigger: 'blur',
                message: '请输入班级名称'
            }, {
                max: 200,
                message: '班级名称不能超过200个字符'
            }],
            classType: [{
                required: true,
                trigger: 'change',
                message: '请选择班级类型'
            }],
            teachingPlanId: [{
                required: true,
                trigger: 'change',
                message: '请选择教学计划'
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
            applyStartTime: [{
                required: true,
                trigger: 'change',
                message: '请选择报名开始时间'
            }, {
                validator(rule, value, callback) {
                    if (value && context.model.applyEndTime) {
                        let st = (new Date(context.FormatDate(context.model.applyEndTime, 'yyyy/MM/dd hh:mm:ss'))).getTime();
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
            applyEndTime: [{
                required: true,
                trigger: 'change',
                message: '请选择报名结束时间'
            }, {
                validator(rule, value, callback) {
                    if (value && context.model.applyStartTime) {
                        let st = (new Date(context.FormatDate(context.model.applyStartTime, 'yyyy/MM/dd hh:mm:ss'))).getTime();
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
            }]
        }
    }
}