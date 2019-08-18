import BaseModel from "./BaseModel";
export default class Notice extends BaseModel {
  announcementType = '';
  noticeTitle = '';
  isSendMsg = false;
  isDraft = true
  noticeContent = '';
  openOrganizationPathId = '';
  announcementAttachs = [];
  announRecUsers = [];
  constructor(props = {}) {
    super();
    Object.assign(this, props);
  }
  static setModels(model){
    let d = Notice.getModel(model);
    d.announcementType = d.announcementType.toString();
    return d;
  }
  static getModels(model) {
    let d = Notice.getModel(model);
    if (d.announRecUsers.length) {
      let arr = []
      d.announRecUsers.forEach(el => {
        arr.push({
          recUserId: el.id
        })
      });
      d.announRecUsers = arr;
    }
    return d;
  }
  static getRules() {
    return {
      announcementType: [{
        required: true,
        message: '请选择消息类型',
        trigger: 'change'
      }],
      noticeTitle: [{
        required: true,
        message: '请输入标题',
        trigger: 'blur'
      }],
      announRecUsers: [{
        required: true,
        message: '请选择用户范围',
      }],
      noticeContent: [{
        required: true,
        message: '请输入内容',
        trigger: 'blur'
      }],
      openOrganizationPathId: [{
        required: true,
        message: '请选择用户范围',
        trigger: 'blur'
      }],
    }
  }
}