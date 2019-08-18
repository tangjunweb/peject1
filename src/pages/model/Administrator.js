import BaseModel from "./BaseModel";
import { ValidateTel } from '@/utils/validate'
export default class Administrator extends BaseModel {
    id = '';
    name = '';
    phoneNumber = '';
    password = '';
    roles = [];
    manageorgId = '';
    organName = '';
    constructor(props = {}) {
        super();
        Object.assign(this, props)
    }
    static getRules() {
        return {
            name: [{
                required: true,
                trigger: 'change',
                message: '请选择党员'
            }],
            phoneNumber: [{
                type: 'number',
                required: true,
                trigger: 'blur',
                message: '请输入正确的管理员手机号',
                transform(value) {
                    return Number(value);
                }
            }, {
                validator: ValidateTel
            }],
            password: [{
                required: true,
                trigger: 'blur',
                message: '请输入管理员密码'
            }],
            manageorgId: [{
                required: true,
                message: '请选择管理组织',
                trigger: 'change'
            }],
            roles: [{
                required: true,
                message: '请选择角色',
                trigger: 'change',
                type: 'array'
            }]
        }
    }
}