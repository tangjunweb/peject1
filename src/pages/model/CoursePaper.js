import BaseModel from './BaseModel'
export default class CoursePaper extends BaseModel {
    id = "";
    trainClassId = "";
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
    constructor(props = {}) {
        super();
        Object.assign(this, props);
        if (typeof this.teachTarget === 'string') {
            this.keyWord = this.teachTarget.split(',');
        }
    }
    static getModels(model) {
        let m = CoursePaper.getModel(model);
        if (Array.isArray(m.teachTarget)) {
            m.teachTarget = m.teachTarget.join(',');
        }
        return m;
    }
    addRandomExamPaper() {
        this.randomExamPaperSet.push({
            id: '',
            libaryId: '',
            singleChoiceCount: '',
            multiChoiceCount: '',
            jugeCount: ''
        })
    }
    static getRules(context) {
        return {
            paperName: [{
                required: true,
                trigger: 'blur',
                message: '请输入试卷名称'
            }],
            beginTitme: [{
                required: true,
                trigger: 'change',
                message: '请选择开始时间',
                pattern: /.+/
            }, {
                validator(rule, value, callback) {
                    if (value && context.model.endTime) {
                        let st = (new Date(context.FormatDate(context.model.endTime, 'yyyy/MM/dd hh:mm:ss'))).getTime();
                        let ct = (new Date(value)).getTime();
                        if (ct > st) {
                            callback(new Error('开始时间不能晚于结束时间'));
                        } else {
                            callback();
                        }
                    } else {
                        callback();
                    }
                }
            }],
            endTime: [{
                required: true,
                trigger: 'change',
                message: '请选择结束时间',
                pattern: /.+/
            }, {
                validator(rule, value, callback) {
                    if (value && context.model.beginTitme) {
                        let st = (new Date(context.FormatDate(context.model.beginTitme, 'yyyy/MM/dd hh:mm:ss'))).getTime();
                        let ct = (new Date(value)).getTime();
                        if (ct < st) {
                            callback(new Error('开始时间不能晚于结束时间'));
                        } else {
                            callback();
                        }
                    } else {
                        callback();
                    }
                }
            }],
        }
    }
}