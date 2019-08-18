import BaseModel from "./BaseModel";
export default class ExamEveryDay extends BaseModel {
  title = '';
  day = '';
  questions = [];
  constructor(props = {}) {
    super();
    Object.assign(this, props);
  }
  static setModels(model) {
    let d = ExamEveryDay.getModel(model);
    return d;
  }
  static getModels(model) {
    let d = ExamEveryDay.getModel(model);
    d.questions = d.questions.map(e => e.questionId)
    return d;
  }
  static getRules() {
    return {
      title: [{
        required: true,
        message: '请输入名称',
        trigger: 'blur'
      }],
      day: [{
        required: true,
        message: '请选择开始日期',
        pattern: /.+/,
        trigger: 'change'
      }],
      questions: [{
        required: true,
        message: '请选择试题',
        trigger: 'change',
        type: 'array'
      }]
    }
  }
}