//学时申报
import BaseModel from './BaseModel'
export default class LiveModel extends BaseModel {
  id = '';
  title = '';
  deviceType = '';
  publishScope = [];
  publishMark = true;
  startTime = '';
  endTime = '';
  coverImage = '';
  description = '';
  enableChat = true;
  constructor(props = {}) {
    super();
    Object.assign(this, props);
    if (typeof this.publishScope === 'string') {
      this.publishScope = this.publishScope.split(',');
    }
  }
  static getModels(model) {
    let m = LiveModel.getModel(model);
    if (Array.isArray(m.publishScope)) {
      m.publishScope = m.publishScope.join(',');
    }
    return m;
  }
  static getRules(context) {
    return {
      title: [{
        required: true,
        trigger: 'blur',
        message: '请输入直播标题'
      }],
      tags: [{
        required: true,
        trigger: 'blur',
        message: '请填写直播地址'
      }],
      deviceType: [{
        required: true,
        trigger: 'change',
        message: '请选择直播类型'
      }],
      startTime: [{
        required: true,
        trigger: 'change',
        message: '请选择开始时间',
        pattern: /.+/
      }, {
        validator(rule, value, callback) {
          if (value && context.model.endTime) {
            let st = (new Date(context.FormatDate(context.model.endTime, 'yyyy/MM/dd hh:mm:ss'))).getTime();
            let ct = (new Date(value)).getTime();
            let nt = (new Date()).getTime();
            if (ct < nt) {
              callback(new Error('开始时间必须大于当前时间'));
            }
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
          if (value && context.model.startTime) {
            let st = (new Date(context.FormatDate(context.model.startTime, 'yyyy/MM/dd hh:mm:ss'))).getTime();
            let ct = (new Date(value)).getTime();
            let nt = (new Date()).getTime();
            if (ct < nt) {
              callback(new Error('结束时间必须大于当前时间'));
            }
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
      publishScope: [{
        required: true,
        trigger: 'change',
        type: 'array',
        message: '请选择公开范围'
      }],
      coverImage: [{
        required: true,
        trigger: 'change',
        message: '请上传封面图'
      }],
      description: [{
        required: true,
        trigger: 'blur',
        message: '请输入简介'
      }]
    }
  }
}