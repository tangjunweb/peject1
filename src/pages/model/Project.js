import BaseModel from './BaseModel'
import { ValidateTel } from '@/utils/validate'
export default class Project extends BaseModel {
    id = '';
    organId = '';
    name = '';
    contactName = '';
    tenancyName = '';
    roleName = '';
    adminName = '';
    password = '';
    contactPhoneNumber = '';
    // siteId = '';
    permissions = [];
    createPermiss() {
        return {
            permissionName: ''
        }
    }
    static getRules() {
        return {
            organId: [{
                required: true,
                message: '请选择党组织',
                trigger: 'change'
            }],
            name: [{
                required: true,
                message: '请输入项目名称',
                trigger: 'blur'
            }],
            contactName: [{
                required: true,
                message: '请输入项目负责人名称',
                trigger: 'blur'
            }],

            tenancyName: [{
                required: true,
                message: '请输入项目域名',
                trigger: 'blur'
            }],
            adminName: [{
                required: true,
                message: '请输入账号',
                trigger: 'blur'
            }],
            password: [{
                required: true,
                message: '请输入密码',
                trigger: 'blur'
            }],
            contactPhoneNumber: [{
                required: true,
                trigger: 'change',
                message: '请输入联系电话',
                type: 'number',
                transform(value) {
                    return Number(value);
                }
            }, {
                validator: ValidateTel
            }],
            // siteId: [{
            //     required: true,
            //     trigger: 'change',
            //     type: 'number',
            //     message: '请选择siteserver站点'
            // }]
        }
    }
    constructor(props = {}) {
        super();
        Object.assign(this, props);
    }
}