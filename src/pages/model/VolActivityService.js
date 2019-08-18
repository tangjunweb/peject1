//帮扶纪实
import BaseModel from './BaseModel'
import { ValidateTel } from '@/utils/validate'
export default class VolActivityService extends BaseModel {
    id = "";
    title = "";
    coverPicture = "";
    type = "";
    startTime = "";
    endTime = "";
    publishMark = false;
    lastApplyTime = "";
    needUserCount = 0;
    contacts = "";
    contactsPhone = "";
    address = "";
    longitude = "";
    latitude = "";
    description = "";
    attention = "";
    constructor(props = {}) {
        super();
        Object.assign(this, props);
        this.publishMark = !!this.publishMark;
    }
    static getRules(context) {
        return {
            title: [{
                required: true,
                trigger: 'blur',
                message: '请输入活动名称'
            }],
            contacts: [{
                required: true,
                trigger: 'blur',
                message: '请输入联系人'
            }],
            contactsPhone: [{
                type: 'number',
                required: true,
                trigger: 'blur',
                message: '请输入联系人电话',
                transform(value) {
                    return Number(value);
                }
            }, {
                validator: ValidateTel
            }],
            address: [{
                required: true,
                trigger: 'change',
                message: '请选择地址'
            }],
            description: [{
                required: true,
                message: '请输入会议描述',
                trigger: 'blur'
            }],
            type: [{
                required: true,
                trigger: 'change',
                message: '请选择活动类型'
            }],
            startTime: [{
                required: true,
                trigger: 'change',
                message: '请输入开始时间'
            }, {
                validator(rule, value, callback) {
                    if (value && context.model.endTime) {
                        let st = (new Date(context.FormatDate(context.model.endTime, 'yyyy/MM/dd'))).getTime();
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
                message: '请输入结束时间'
            }, {
                validator(rule, value, callback) {
                    if (value && context.model.startTime) {
                        let st = (new Date(context.FormatDate(context.model.startTime, 'yyyy/MM/dd'))).getTime();
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
            lastApplyTime: [{
                required: true,
                trigger: 'change',
                message: '请输入报名截止时间'
            }]
        }
    }
}