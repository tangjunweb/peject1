//帮扶纪实
import BaseModel from './BaseModel'
export default class DiffcultyHelp extends BaseModel {
    id = "";
    title = "";
    orginId = "";
    partyMemberId = "";
    helpType = "";
    helpDetail = "";
    helpDate = "";
    attachs = [];
    applySource = 1;
    constructor (props = {}) {
        super();
        Object.assign(this,props);
    }
    static getRules () {
        return {
            title: [{
                required: true,
                trigger: 'blur',
                message: '请输入帮扶主题'
            }],
            helpType: [{
                required: true,
                trigger: 'change',
                message: '请选择帮扶类型'
            }],
            helpDate: [{
                required: true,
                trigger: 'change',
                message: '请选择帮扶日期'                
            }]                   
        }
    }        
}