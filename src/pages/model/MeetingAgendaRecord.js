//会议纪实
import BaseModel from './BaseModel'
export default class MeetingAgendaRecord extends BaseModel {
    meetingId = "";
    agendaContents = {
        id: '',
        agendaResultRecord: ''
    };
    summaryAttachs = {
        id: '',
        type: 0,
        path: '',
        size: '',
        name: ''
    };
    constructor (props = {}) {
        super();
        Object.assign(this,props);
    }
    static getRules () {
        return {
            "agendaContents.agendaResultRecord": [{
                required: true,
                trigger: 'blur',
                message: '请输入会议记录'
            }]                   
        }
    }        
}