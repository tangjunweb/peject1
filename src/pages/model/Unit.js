import BaseModel from "./BaseModel"
import { ValidateTel, ValidateIDCard } from '@/utils/validate'
export default class Unit extends BaseModel {
    organId = '';
    legalEntityFlag = true;
    unitName = '';
    unitNatrueType = '';
    establishmentOfOrg = '';
    socialCrediitCode = '';
    socialCrediitCode1 = '';
    principal = '';
    principalIdCard = '';
    contrator = '';
    contratPhone = '';
    address = '';
    constructor(props = {}) {
        super();
        Object.assign(this, props);
    }
    static getModels(model) {
        let d = Unit.getModel(model);
        d.socialCrediitCode = d.socialCrediitCode1
        return d;
    }
    static getRules() {
        return {
            unitName: [{
                required: true,
                message: '请输入单位名称',
                trigger: 'blur'
            }],
            unitNatrueType: [{
                required: true,
                message: '请选择单位性质类别',
                trigger: 'change'
            }],
            establishmentOfOrg: [{
                required: true,
                message: '请输入党组织情况',
                trigger: 'change'
            }],
            socialCrediitCode: [{
                required: true,
                message: '请输入单位信用代码',
                trigger: 'blur'
            }, {
                validator(rule, value, callback) {
                    if (/^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/.test(value)) {
                        callback();
                    } else {
                        callback(new Error('请输入18位正确的单位信用代码'));
                    }
                }
            }],
            socialCrediitCode1: [{
                validator(rule, value, callback) {
                    if (value) {
                        if (/^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/.test(value)) {
                            callback();
                        } else {
                            callback(new Error('请输入18位正确的单位信用代码'));
                        }
                    } else {
                        callback();
                    }
                }
            }],
            principal: [{
                required: true,
                message: '请输入负责人',
                trigger: 'blur'
            }],
            principalIdCard: [{
                required: true,
                message: '请输入负责人身份证',
                trigger: 'blur'
            }, {
                validator: ValidateIDCard
            }],
            contrator: [{
                required: true,
                message: '请输入联系人',
                trigger: 'blur'
            }],
            contratPhone: [{
                type: 'number',
                required: true,
                message: '请输入直接联系电话',
                trigger: 'blur',
                transform(value) {
                    return Number(value);
                }
            }, {
                validator: ValidateTel
            }],
            address: [{
                required: true,
                message: '请输入单位地址',
                trigger: 'change'
            }]
        }
    }
}
