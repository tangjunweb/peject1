//会议
import BaseModel from './BaseModel'
export default class OrganizationLifeMng extends BaseModel {
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
    meetingSignType = '';
    infoOutDtos = [];

    constructor(props = {}) {
        super();
        if (props.month) {
            if (Number(props.month) < 10) {
                props.month = '0' + String(props.month);
            } else {
                props.month = String(props.month);
            }
        }

        Object.assign(this, props);
    }
    static getModels(model) {
        let d = JSON.parse(JSON.stringify(model));
        if (d.quarte) {
            d.timeType = '2'
        } else if (d.month) {
            d.timeType = '1';
        } else {
            d.timeType = '3';
        }
        if (d.month == "undefined") {
            d.month = ''
        }
        if (d.month == null) {
            d.month = ''
        }
        d.meetingSignType = String(d.meetingSignType);

        return d;
    }



    static getRules(context) {
        return {
            title: [{
                required: true,
                trigger: 'blur',
                message: '请输入会议标题'
            }, {
                required: true,
                trigger: 'blur',
                validator(rule, value, callback) {
                    if (value.trim().length > 50) {
                        callback(new Error('字数限制50个字符'))
                    } else {
                        callback()
                    }

                }
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
            // organId: [{
            //     required: true,
            //     trigger: 'change',
            //     message: '请选择党组织'
            // }],
            meetingSignType: [{
                required: true,
                trigger: 'blur',
                message: '请选择签到类型'
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
                            callback(new Error('开始时间不能大于结束时间'));
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
                            callback(new Error('开始时间不能大于结束时间'));
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