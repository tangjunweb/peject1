import BaseModel from './BaseModel'
export default class Code extends BaseModel {
    id = '';
    codeType = '';
    text = '';
    value = '';
    parentValue = '';
    sortCode = 0;
    constructor (props = {}) {
        super();
        Object.assign(this, props);
    }
    static getRules () {
        return {
            codeType: [{
                required: true,
                message: '请选择码表类型',
                trigger: 'change'
            }],
            text: [{
                required: true,
                message: '请输入码表名称',
                trigger: 'blur'
            }]
        }
    }
}