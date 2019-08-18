import BaseModel from './BaseModel'
import { ValidateIDCard } from '@/utils/validate'
export default class OrganTeamMember extends BaseModel {
    id = '';
    organId = '';
    userId = '';
    teamMemberType = '';
    name = '';
    idCard = '';
    sex = '';
    education = '';
    adminDuty = {
        adminDutyCode: '',
        adminDutyDate: '',
        adminDutyIsInOffice: '',
        adminDutyOutDate: '',
        adminPTSituation: '',
        birthDay: '',
        mobilePhone: ''
    };
    organDuty = {
        partyDutyCode: '',
        partyDutyClass: '',
        partyDutyDate: '',
        partyDutyIsInOffice: true,
        partyDutyOutDate: '',
        organSecretary: '',
        partyDutySession: '',
        partyDutyIntro: ''
    };
    twoOneDuty = {
        coreType: '',
        corElectedDate: '',
        corExpiryDate: '',
        coreIsInOffice: true,
        corAbortDate: '',
        corAbortReason: ''
    };
    static getRules () {
        return {
            name: [{
                required: true,
                message: '请输入姓名',
                trigger: 'change'
            }],
            idCard: [{
                required: true,
                message: '请输入身份证号',
                trigger: 'blur'
            },{
                validator: ValidateIDCard
            }],
            sex: [{
                required: true,
                message: '请选择性别',
                trigger: 'change'
            }],
            education: [{
                required: true,
                message: '请选择学历',
                trigger: 'change'
            }],
            "adminDuty.adminDutyCode": [{
                required: true,
                message: '请输入行政职务代码',
                trigger: 'blur'
            }],
            "adminDuty.adminDutyDate": [{
                required: true,
                type: 'date',
                message: '请选择任职日期',
                trigger: 'change'
            }],
            "adminDuty.adminDutyOutDate": [{
                required: true,
                message: '请选择日期',
                trigger: 'change',
                type: 'date'
            }],
            "organDuty.adminDutyOutDate": [{
                required: true,
                message: '请选择日期',
                trigger: 'change',
                type: 'date'
            }],
            "organDuty.partyDutyClass": [{
                required: true,
                message: '请选择职务级别',
                trigger: 'change'
            }],
            "organDuty.partyDutyDate": [{
                required: true,
                message: '请选择任职日期',
                trigger: 'change',
                type: 'date'
            }],
            "organDuty.partyDutyOutDate": [{
                required: true,
                message: '请选择离职日期',
                trigger: 'change',
                type: 'date'
            }],
            "organDuty.organSecretary": [{
                required: true,
                message: '请选择党组织书记身份类型',
                trigger: 'change'
            }],
            "organDuty.partyDutySession": [{
                required: true,
                message: '请输入任职届次',
                trigger: 'blur'
            }]
        }
    }
    constructor (props = {}) {
        super();
        Object.assign(this,props);
    }
}
