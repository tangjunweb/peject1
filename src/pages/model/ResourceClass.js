import BaseModel from './BaseModel'
export default class ResourceClass extends BaseModel {
    id = "";
    parentId = null;
    className = "";
    constructor (props = {}) {
        super();
        Object.assign(this,props);
    }
    static getRules () {
        return {
            className: [{
                required: true,
                trigger: 'blur',
                message: '请输入分类名称'
            }]                    
        }
    }        
}