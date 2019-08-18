//入党申请
import BaseModel from './BaseModel'
export default class JoinPartyApply extends BaseModel {
    id = "";
    name = "";
    organId = "";
    sex = "";
    nation = "";
    mobilePhone = "";
    otherContack = "";
    idCard = "";
    birthday = "";
    education = "";
    post = "";
    headImage = "";
    applicationDate = "";
    applyAttach = {
        id: '',
        type: 0,
        name: '',
        path: '',
        size: ''
    };
    applySource = 1;
    constructor (props = {}) {
        super();
        Object.assign(this,props);
    }
    static getRules () {
        return {
            name: [{
                required: true,
                trigger: 'blur',
                message: '请输入党员姓名'
            }],
            organId: [{
                required: true,
                trigger: 'change',
                message: '请选择党组织'
            }],
            sex: [{
                required: true,
                trigger: 'change',
                message: '请选择性别'
            }],
            nation: [{
                required: true,
                trigger: 'change',
                message: '请选择民族'
            }],
            mobilePhone: [{
                required: true,
                trigger: 'blur',
                message: '请输入手机号'
            }],
            idCard: [{
                required: true,
                trigger: 'blur',
                message: '请输入身份证号码'
            }],
            birthday: [{
                required: true,
                trigger: 'change',
                type: 'date',
                message: '请选择生日'
            }],  
            applicationDate: [{
                required: true,
                trigger: 'change',
                type: 'date',
                message: '请选择入党申请时间'
            }],  
            education: [{
                required: true,
                trigger: 'change',
                message: '请选择学历'
            }],  
            post: [{
                required: true,
                trigger: 'change',
                message: '请选择工作岗位'
            }],  
            headImage: [{
                required: true,
                trigger: 'change',
                message: '请上传照片'
            }],  
            'applyAttach.id': [{
                required: true,
                trigger: 'change',
                message: '请上传入党申请书'
            }],                                                                                                                                                      
        }
    }        
}