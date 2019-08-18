import BaseModel from "./BaseModel";
export default class Role extends BaseModel {
    projectId = '';
    roleLevel = '';
    roleType = '';
    name = '';
    displayName = '';
    normalizedName = '';
    description = '';
    isStatic = true;
    rolePermissions = [];
    constructor (props = {}) {
        super();
        Object.assign(this,props);
    }
    static getRules () {
        return {
            projectId: [{
                required: true,
                message: '请选择项目',
                trigger: 'change'
            }],
            roleLevel: [{
                required: true,
                message: '请选择项目级别',
                trigger: 'change'                
            }],
            roleType: [{
                required: true,
                message: '请选择角色类型',
                trigger: 'change'
            }],
            name: [{
                required: true,
                message: '请输入角色名称',
                trigger: 'blur'
            }],
            displayName: [{
                required: true,
                message: '请输入角色显示名称',
                trigger: 'blur'
            }]            
        }
    }
}