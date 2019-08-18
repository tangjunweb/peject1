import BaseModel from './BaseModel'
export default class ExamQuestion extends BaseModel {
    id = "";
    libaryId = "";
    title = "";
    analysis = "";
    type = "1";
    resources = [];
    jugeQuestionAnswer = true;
    examAnswerInputDtos = [];
    constructor (props = {}) {
        super();
        Object.assign(this,props);
    }
    addExamAnswerInputDtos () {
        let optionIndex;
        //console.log(optionIndex.charCodeAt())fromCharCode
        if(this.examAnswerInputDtos.length){
            let ac = this.examAnswerInputDtos[this.examAnswerInputDtos.length-1].optionIndex.charCodeAt();
            optionIndex = String.fromCharCode(ac+1);
        }else{
            optionIndex = 'A'
        }
        this.examAnswerInputDtos.push({
            id: '',
            optionIndex,
            option: '',
            isRight: false
        })
    }
    delExamAnswerInputDtos (i) {
        this.examAnswerInputDtos.splice(i,1);
        let optionIndex = 65;
        this.examAnswerInputDtos.forEach(e=>{
            e.optionIndex = String.fromCharCode(optionIndex);
            optionIndex++;            
        })
    }
    static getRules () {
        return {
            title: [{
                required: true,
                trigger: 'blur',
                message: '请输入试题名称'
            }]                    
        }
    }        
}