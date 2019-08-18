//会议
import BaseModel from './BaseModel'
import { ValidateTel } from '@/utils/validate'
export default class PartyMeeting extends BaseModel {
    id = "";
    meetingClass = "";
    meetingType = "";
    title = "";
    meetingAddress = "";
    latitude = "";
    longitude = "";
    beginTime = "";
    endTime = "";
    hostUserId = "";
    recorderUserId = "";
    agendaContents = [];
    meetingAttachs = [];
    meetingSignType = '';
    linkPhone = '';
    isFixedDay = false;
    datetimerange = [];
    constructor(props = {}) {
        super();
        Object.assign(this, props);
        if (this.beginTime) {
            this.datetimerange.push(this.beginTime);
        }
        if (this.endTime) {
            this.datetimerange.push(this.endTime);
        }
        this.meetingSignType = String(this.meetingSignType);
        this.meetingClass = String(this.meetingClass);
    }
    addContent() {
        this.agendaContents.push({
            agendaContent: ''
        })
    }
    static getModels(model) {
        if (model.datetimerange[0] && model.datetimerange[0].Format) {
            model.datetimerange[0] = model.datetimerange[0].Format('yyyy-MM-dd hh:mm:ss');
        }
        if (model.datetimerange[1] && model.datetimerange[1].Format) {
            model.datetimerange[1] = model.datetimerange[1].Format('yyyy-MM-dd hh:mm:ss');
        }
        let d = PartyMeeting.getModel(model);
        if (d.datetimerange && d.datetimerange.length === 2) {
            d.beginTime = d.datetimerange[0];
            d.endTime = d.datetimerange[1];
            delete d.datetimerange;
        }
        return d;
    }
    static getRules() {
        return {
            title: [{
                required: true,
                trigger: 'blur',
                message: '请输入会议主题'
            }],
            meetingType: [{
                required: true,
                trigger: 'change',
                message: '请选择会议类型'
            }],
            meetingSignType: [{
                required: true,
                trigger: 'change',
                message: '请选择会议签到类型'
            }],
            meetingClass: [{
                required: true,
                trigger: 'change',
                message: '请选择签到方式'
            }],
            datetimerange: [{
                type: 'array',
                required: true,
                trigger: 'change',
                message: '请选择会议时间'
            }],
            recorderUserId: [{
                required: true,
                trigger: 'change',
                message: '请选择会议记录人'
            }],
            hostUserId: [{
                required: true,
                trigger: 'change',
                message: '请选择会议主持人'
            }],
            linkPhone: [{
                type: 'number',
                required: true,
                trigger: 'blur',
                message: '请输入正确的联系电话',
                transform(value) {
                    return Number(value);
                }
            }, {
                validator: ValidateTel
            }]
        }
    }
}