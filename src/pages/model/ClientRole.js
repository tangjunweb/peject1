import BaseModel from "./BaseModel";
export default class ClientRole extends BaseModel {
    roleType = '';
    name = '';
    description = '';
    managedUnitNatrues = '';
    managedUnitNatruesArr = [];
    permissions = [];
    constructor (props = {}) {
        super();
        Object.assign(this,props);
        if(this.roleType){
            this.roleType+='';
        }        
        if(this.managedUnitNatrues){
            this.managedUnitNatruesArr = this.managedUnitNatrues.split(',');
        }
    }
    static getModels (model) {
        let d = ClientRole.getModel(model);
        d.managedUnitNatrues = d.managedUnitNatruesArr.join(',');
        delete d.managedUnitNatruesArr;
        return d;
    }
    static getRules () {
        return {
            roleLevel: [{
                required: true,
                message: '请选择角色级别',
                trigger: 'change'
            }],
            name: [{
                required: true,
                message: '请输入角色名称',
                trigger: 'blur'
            }],
            description: [{
                max: 5000,
                message: '描述不得超过5000个字符',
                trigger: 'blur'
            }],
            managedUnitNatruesArr: [{
                required: true,
                type: 'array',
                message: '请选择单位管理范围',
                trigger: 'change'
            }]      
        }
    }
}