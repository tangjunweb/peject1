import BaseModel from './BaseModel'
export default class Resource extends BaseModel {
    id = "";
    name = "";
    resourceType = "";
    resourceClassId = "";
    teachTarget = [];
    keyWord = [];
    brief = "";
    period = 0;
    uploadUrl = "";
    flvUrl = "";
    aliVideoId = "";
    teachScope = [];
    coverUrl = '';
    mediaSource = '';
    courseSource = '';
    isEnable = true;
    isStandard = false;
    isCompulsory = false;
    constructor (props = {}) {
        super();
        Object.assign(this,JSON.parse(JSON.stringify(props)));
        if(typeof this.keyWord === 'string'){
            this.keyWord = this.keyWord.split(',');
        }
        if(typeof this.teachTarget === 'string'){
            this.teachTarget = this.teachTarget.split(',');
        }        
        this.isEnable = !!this.isEnable;
    }
    static getModels (model) {
        let m = Resource.getModel(model);
        if(Array.isArray(m.teachTarget)){
            m.teachTarget = m.teachTarget.join(',');
        }
        if(m.teachScope.length){
            if(typeof m.teachScope[0] === 'object'){
                m.teachScope = m.teachScope.map(e=>e.organId)
            }
        }
        return m;
    }
    static getRules () {
        return {
            name: [{
                required: true,
                trigger: 'blur',
                message: '请输入标题'
            }],
            resourceClassId: [{
                required: true,
                trigger: 'change',
                message: '请选择资源分类'
            }],    
            teachScope: [{
                required: true,
                trigger: 'change',
                message: '请选择教学范围',
                type: 'array'
            }],  
            teachTarget: [{
                required: true,
                trigger: 'change',
                message: '请选择教学对象',
                type: 'array'
            }], 
            mediaSource: [{
                required: true,
                trigger: 'change',
                message: '请选择介质来源',
            }], 
            courseSource: [{
                required: true,
                trigger: 'change',
                message: '请选择课程来源',
            }], 
            keyWord: [{
                required: true,
                trigger: 'change',
                message: '请输入关键词',
                type: 'array'
            }], 
            brief: [{
                required: true,
                trigger: 'blur',
                message: '请输入简介'
            }],   
            coverUrl: [{
                required: true,
                trigger: 'change',
                message: '请上传封面图'
            }],    
            uploadUrl: [{
                required: true,
                trigger: 'change',
                message: '请上传文件'
            }]                                                                                      
        }
    }        
}