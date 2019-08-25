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
    address = '';
    peopleNumber = "";
    isPartyDay = false;
    lifeContent = "";
    isNeedPeopleInfo = false;
    contacts = '';
    telephoneNumber = '';

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
                trigger: 'blur',
                message: '请填写会议地点'
            }],
            peopleNumber: [{
                required: true,
                trigger: 'blur',
                message: '请填写会议人数'
            }],
            isPartyDay: [{
                required: true,
                trigger: 'change',
                message: '请选择是否固定党日'
            }],
            lifeContent: [{
                required: true,
                trigger: 'blur',
                message: '请填写活动内容'
            }],
            isNeedPeopleInfo: [{
                required: true,
                trigger: 'change',
                message: '请选择是否需人员信息'
            }],
            meetingSignType: [{
                required: true,
                trigger: 'blur',
                message: '请选择签到类型'
            }],
            contacts: [{
                required: true,
                trigger: 'blur',
                message: '请填写联系人'
            }],
            telephoneNumber: [{
                required: true,
                trigger: 'blur',
                message: '请输入联系电话'
            }, {
                validator(rule, value, callback) {
                    if (value && context.formValidate.telephoneNumber) {

                        let reg = /^((13[0-9])|(14[0-9])|(15([0-9]))|(17[0-9])|(18[0-9])|(16[0-9])|(19[0-9]))[0-9]{8}$/;
                        if (!value) {
                            callback(new Error("请输入联系电话"));
                        } else if (!reg.test(value)) {
                            callback(new Error("请输入正确的手机号格式"));
                        } else {
                            callback();
                        }
                    } else {
                        callback();
                    }
                }
            }],
            startTime: [{
                required: true,
                trigger: 'change',
                message: '请选择开始时间',
                pattern: /.+/
            }, {
                validator(rule, value, callback) {
                    if (value && context.formValidate.endTime) {
                        let st = (new Date(context.FormatDate(context.formValidate.endTime, 'yyyy/MM/dd hh:mm:ss'))).getTime();
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
                    if (value && context.formValidate.startTime) {
                        let st = (new Date(context.FormatDate(context.formValidate.startTime, 'yyyy/MM/dd hh:mm:ss'))).getTime();
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