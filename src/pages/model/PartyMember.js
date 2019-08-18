import BaseModel from './BaseModel'
import { ValidateIDCard, ValidateTel } from '@/utils/validate'
export default class PartyMember extends BaseModel {
    name = '';
    organId = '';
    headImage = '';
    addition = {
        sex: '',
        nation: '',
        mobilePhone: '',
        otherContack: '',
        idCard: '',
        birthday: '',
        education: '',
        nativePlace: '',
        isTaiWanDomicile: false,
        livePlace: '',
        domicileAddress: '',
        post: '',
        technicalLevel: '',
        currentTechnicalLevle: '',
        currentSocialClass: '',
        oneLineSituation: '',
        isMigrantWorker: false,
        technicalLevelDate: '',
        adminDutyCode: '',
        adminDutyDate: '',
        adminDutyIsInOffice: false,
        adminDutyOutDate: '',
        adminPTSituation: '',
        corElectedDate: '',
        corExpiryDate: '',
        corAbortDate: '',
        corAbortReason: ''
    };
    partyMember = {
        joinPartyDate: '',
        partyMemeberType: '',
        formalMemberDate: '',
        isLostMember: false,
        lostDate: '',
        lostSituation: '',
        isFlowMember: false,
        archiveUnitName: '',
        storageType: '',
        joinPartyType: '',
        joinSocialClassType: '',
        joinPost: '',
        joinOrgId: '',
        joinTechnicalLevel: '',
        joinIsMigrantWorker: '',
        applicationDate: '',
        developMentDate: '',
        activeDate: '',
        positiveSituation: '',
        joinEducation: '',
        joinOneLineSituation: '',
        joinIntroducers: [],
        partyDutyCode: '',
        partyDutyDate: '',
        partyDutyIsInOffice: false,
        partyDutyOutDate: '',
        isDifficult: false,
        difficultType: '',
        isLowAllowance: false,
        isNoWorkOldMember: false,
        isPensionBenefits: false,
        difficulInstruction: '',
        healthSituation: '',
        intergrity: ''
    };
    constructor(props = {}) {
        super();
        Object.assign(this, JSON.parse(JSON.stringify(props)));
        if(!this.addition) this.addition = {};
        this.partyMember.partyDutyIsInOffice = !!this.partyMember.partyDutyIsInOffice;
        this.addition.isMigrantWorker = !!this.addition.isMigrantWorker;
        this.addition.adminDutyIsInOffice = !!this.addition.adminDutyIsInOffice;
        this.partyMember.isFlowMember = !!this.partyMember.isFlowMember;
        this.partyMember.isDifficult = !!this.partyMember.isDifficult;
        this.partyMember.isLowAllowance = !!this.partyMember.isLowAllowance;
        this.partyMember.isNoWorkOldMember = !!this.partyMember.isNoWorkOldMember;
        this.partyMember.isPensionBenefits = !!this.partyMember.isPensionBenefits;
        this.addition.isTaiWanDomicile = !!this.addition.isTaiWanDomicile;
    }
    static getRules() {
        return {
            headImage: [{
                message: '请上传头像',
                trigger: 'change'
            }],
            name: [{
                required: true,
                message: '请输入姓名',
                trigger: 'blur'
            }],
            organId: [{
                required: true,
                message: '请选择党组织',
                trigger: 'change'
            }],
            'addition.education': [{
                required: true,
                message: '请选择学历',
                trigger: 'change'
            }],
            'addition.livePlace': [{
                required: true,
                message: '请输入现居住地',
                trigger: 'blur'
            }],
            'addition.idCard': [{
                required: true,
                trigger: 'blur',
                message: '请输入身份证号'
            }, {
                validator: ValidateIDCard
            }],
            'addition.mobilePhone': [{
                type: 'number',
                required: true,
                trigger: 'blur',
                message: '请输入手机号',
                transform(value) {
                    return Number(value);
                }
            }, {
                validator: ValidateTel
            }],
            'partyMember.partyMemeberType': [{
                required: true,
                trigger: 'change',
                message: '请选择党员类别'
            }]
        }
    }
}
