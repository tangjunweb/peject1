import BaseModel from './BaseModel'
export default class ExamPaper extends BaseModel {
    id = "";
    paperName = "";
    beginTitme = "";
    endTime = "";
    passScore = 60;
    testTime = 1;
    singleChoiceScore = 0;
    multipleChoiceScore = 0;
    jugeScore = 0;
    teachScope = [];
    teachTarget = [];
    questionList = [];
    randomExamPaperSet = [];
    constructor (props = {}) {
        super();
        Object.assign(this,props);
        if(typeof this.teachTarget === 'string'){
            this.keyWord = this.teachTarget.split(',');
        }            
    }
    static getModels (model) {
        let m = ExamPaper.getModel(model);
        if(Array.isArray(m.teachTarget)){
            m.teachTarget = m.teachTarget.join(',');
        }
        return m;
    }      
    addRandomExamPaper () {
        this.randomExamPaperSet.push({
            id: '',
            libaryId: '',
            singleChoiceCount: '',
            multiChoiceCount: '',
            jugeCount: ''
        })
    }   
    static getRules () {
        return {
            paperName: [{
                required: true,
                trigger: 'blur',
                message: '请输入试卷名称'
            }],
            beginTitme: [{
                required: true,
                trigger: 'change',
                type: 'date',
                message: '请输入开始时间'
            }],
            endTime: [{
                required: true,
                trigger: 'change',
                type: 'date',
                message: '请输入结束时间'
            }],
            passScore: [{
                type: 'number',
                required: true,
                message: '请输入及格分数线',
                trigger: 'blur'
            }]                                             
        }
    }        
}