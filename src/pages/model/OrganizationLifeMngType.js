//会议
import BaseModel from './BaseModel'
export default class OrganizationLifeMng extends BaseModel {
    meetingType = "";
    linkPhone = "";
    title = '';
    meetingAddress = '';
    meetingSignType = '';
    isFixedDay = false;
    isPartyClasses = false;
    isVideoconference = false;
    content = "";
    operUserId = "";
    operUserName = "";
    parentInfoId = "";
    planDetailsId = "";
    meetingUsers = [];
    agendaContents = [];
    meetingAttachs = [];
    meetingClass = 1;
    latitude = 0;
    longitude = 0;
    linkPhone = '';
    beginTime = '';
    endTime = '';
    operUser = {};   
    agendaContents= [
        {
          id: "",
          agendaContent: "",
          parentInfoId: ""
        }
    ];
    meetingAttachs= [];
    partyMeetingInfoResources = []


    constructor(props = {}) {
        super();
        Object.assign(this, props);
    }

    static getModels(model) {
        let d = Object.assign({}, model);
        if(d.operUser){
            if (d.operUser.name) {
                d.operUserId = d.operUser.id;
                d.operUserName = d.operUser.name;
                // delete  d.operUser
            }
        }else{
            d.operUser={}
        }

        d.meetingUsers = d.meetingUsers.map(item => {
       
            return {
                id: item.id,
                name: item.name,
                meetingUserType:1,
                userId:item.userId||item.id
            }
        });
        return d
    }

    static getRules(context) {
        return {

            meetingType: [{
                required: true,
                trigger: 'blur',
                message: '请选择组织生活类型'
            }],
            // isPartyClasses: [{
            //     required: true,
            //     trigger: 'blur',
            //     message: '请选择是否上党课'
            // }],
            operUserName: [{
                trigger: 'blur',
                validator(rule, value, callback) {
                    if (value.trim().length > 10) {
                        callback(new Error('字数限制10个字符'))
                    } else {
                        callback()
                    }

                }
            }],
            // isVideoconference: [{
            //     required: true,
            //     trigger: 'blur',
            //     message: '请选择是否使用视频会议'
            // }],
            content: [{
                required: true,
                trigger: 'blur',
                message: '请输入内容'
            }],
            meetingUsers: [{
                required: true,
                trigger: 'change',
                // message: '请选择参与人员',
                validator(rule, value, callback) {
                    if (value.length == 0) {
                        callback(new Error('请选择参与人员'));
                    } else {
                        callback();
                    }
                }

            }]
        }
    }

    //  {
    //             validator(rule, value, callback) {
    //                 if (value && context.model.endTime) {
    //                     let st = (new Date(context.FormatDate(context.model.endTime, 'yyyy/MM/dd hh:mm:ss'))).getTime();
    //                     let ct = (new Date(value)).getTime();
    //                     if (ct > st) {
    //                         callback(new Error('开始时间不能大于结束时间'));
    //                     } else {
    //                         callback();
    //                     }
    //                 } else {
    //                     callback();
    //                 }
    //             }
    // }],



}