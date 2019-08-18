import BaseModel from "./BaseModel";
export default class Abroad extends BaseModel {
    id = '';
    userId = '';
    abroadCountry = '';
    abroadReason = '';
    abroadDate = '';
    backDate = '';
    instruction = '';
    constructor (props = {}) {
        super();
        Object.assign(this,props);
    }
    static getRules () {
        return {
            abroadCountry: [{
                required: true,
                message: '请输入国家名称',
                trigger: 'blur'
            }],
            abroadReason: [{
                required: true,
                message: '请输入出国原因',
                trigger: 'blur'
            }]            
        }
    }
}