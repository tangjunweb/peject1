import BaseModel from './BaseModel'
export default class EducationSite extends BaseModel {
    id = "";
    organId = '';
    category = 'null';
    baseName = "";
    address = "";
    contact = "";
    contactPhoneNumber = "";
    baseTel = "";
    longitude = "";
    latitude = "";
    siteArea = null;
    capacity = null;
    ptCommentatorCount = null;
    ftCommentatorCount = null;
    brief = "";
    peasantNightSchoolSite = "";
    microPartySchoolSite = "";
    declareUnit = "";
    declarer = "";
    declareType = "";
    declareUnitOption = "";
    deptSendOption = "";
    coverPic = "";
    constructor(props = {}) {
        super();
        Object.assign(this, props);
    }
    static getRules() {
        return {
            organId: [{
                required: true,
                trigger: 'change',
                message: '请选择党组织'
            }],
            baseName: [{
                required: true,
                trigger: 'blur',
                message: '请输入远程教育基地名称'
            }, {
                max: 100,
                message: '名称太长，不能超过100个字符'
            }],
            address: [{
                required: true,
                trigger: 'change',
                message: '请选择远程教育基地地址'
            }, {
                max: 200,
                message: '地址太长，不能超过200个字符'
            }],
            contact: [{
                required: true,
                message: '请输入远程教育基地联系人',
                trigger: 'blur'
            }],
            contactPhoneNumber: [{
                message: '请输入正确的基地联系人手机号码',
                trigger: 'blur',
                type: 'number',
                transform(value) {
                    if (value) {
                        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
                        if (!reg.test(value)) {
                            return false
                        } else {
                            return Number(value)
                        }
                    }
                }
            }],
            coverPic: [{
                required: true,
                message: '请上传远程教育基地封面',
                trigger: 'change'
            }],
            baseTel: [{
                required: true,
                message: '请输入远程教育基地联系电话',
                trigger: 'blur',
            }, {
                trigger: 'blur',
                pattern: /^(([1-9]\d{4,10}))?$/,
                message: '请输入正确的联系电话',
            }],
            capacity: [{
                required: true,
                trigger: 'blur',
                message: '请输入可容纳人数'
            }, {
                trigger: 'blur',
                pattern: /^(([1-9]\d{0,4})|0)?$/,
                message: '可容纳人数为整数且不能超过99999',
            }],
            siteArea: [{
                required: true,
                trigger: 'blur',
                message: '请输入场地面积',
            }, {
                trigger: 'blur',
                pattern: /^(([1-9]\d{0,4})|0)(\.\d{0,2})?$/,
                message: '场地面积保留小数点两位',
            }],
            ptCommentatorCount: [{
                required: true,
                trigger: 'blur',
                message: '请输入兼职讲解员人数'
            }, {
                trigger: 'blur',
                pattern: /^(([1-9]\d{0,4})|0)?$/,
                message: '职讲解员人数为整数且不能超过99999',
            }],
            ftCommentatorCount: [{
                required: true,
                trigger: 'blur',
                message: '请输入专职讲解员人数',
            }, {
                trigger: 'blur',
                pattern: /^(([1-9]\d{0,4})|0)?$/,
                message: '专职讲解员人数为整数且不能超过99999',
            }]
        }
    }
}