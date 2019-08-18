import BaseModel from './BaseModel'
export default class ExamLibrary extends BaseModel {
    id = "";
    libaryName = "";
    coverImageUrl = "";
    constructor (props = {}) {
        super();
        Object.assign(this,props);
    }
    static getRules () {
        return {
            libaryName: [{
                required: true,
                trigger: 'blur',
                message: '请输入题库名称'
            }],
            coverImageUrl: [{
                required: true,
                type: 'string',
                trigger: 'change',
                message: '请上传封面图'
            }]                    
        }
    }        
}