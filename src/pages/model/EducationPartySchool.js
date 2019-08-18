import BaseModel from './BaseModel'
export default class EducationPartySchool extends BaseModel {
  id = "";
  microName = '';
  relationOrganIds = [];
  contact = "";
  contactPhoneNumber = "";
  address = "";
  longitude = "";
  latitude = "";
  isDemoSchool = 0;
  fullNarratorCount = "";
  partNarratorCount = "";
  siteArea = "";
  holdUserCount = "";
  classRoomCount = "";
  isProjection = 0;
  isTheme = 0;
  profiles = "";
  coverImgUrl = "";
  resourceIds = [];
  announcementAttachs = [];
  actionGallery = [];
  spaceGallery = [];
  roomGallery = [];
  deviceGallery = [];
  constructor(props = {}) {
    super();
    Object.assign(this, props);
  }
  static setModels(model) {
    let d = EducationPartySchool.getModel(model);
    d.resourceIds = d.resourceIds.map(e => {
      return e.id
    })
    d.isTheme = d.isTheme ? true : false;
    d.isProjection = d.isProjection ? true : false;
    d.isDemoSchool = d.isDemoSchool ? true : false;
    let arr = [...d.roomGallery, ...d.actionGallery, ...d.spaceGallery]
    arr.forEach(e => e.path = e.url);
    d.announcementAttachs = arr;
    d.relationOrganIds = d.relationOrganIds.join(',');
    delete d.attachMentOutPuts;
    delete d.actionGallery;
    delete d.roomGallery;
    delete d.spaceGallery;
    delete d.deviceGallery;
    return d;
  }
  static getModels(model) {
    let d = EducationPartySchool.getModel(model);
    d.attachMentOutPuts.forEach(e => {
      e.url = e.path
    });
    d.isTheme = d.isTheme ? 1 : 0;
    d.isProjection = d.isProjection ? 1 : 0;
    d.isDemoSchool = d.isDemoSchool ? 1 : 0;
    d.relationOrganIds = d.relationOrganIds.split(',')
    return d;
  }
  static getRules() {
    return {
      microName: [{
        required: true,
        trigger: 'blur',
        message: '请输入微党校名称'
      }, {
        max: 100,
        message: '名称太长，不能超过100个字符'
      }],
      relationOrganIds: [{
        required: true,
        trigger: 'change',
        type: 'array',
        message: '请选择关联党组织'
      }],
      contact: [{
        required: true,
        trigger: 'blur',
        message: '请输入联系人'
      }],
      contactPhoneNumber: [{
        type: 'number',
        required: true,
        trigger: 'blur',
        message: '请输入正确的管理员手机号',
        transform(value) {
          return Number(value);
        }
      }],
      address: [{
        required: true,
        trigger: 'change',
        message: '请选择院校地址'
      }, {
        max: 200,
        message: '地址太长，不能超过200个字符'
      }],
      fullNarratorCount: [{
        required: true,
        message: '请输入专职讲解员人数',
        type: 'integer',
        trigger: 'blur'
      }],
      partNarratorCount: [{
        required: true,
        message: '请输入兼职讲解员人数',
        type: 'integer',
        trigger: 'blur'
      }],
      siteArea: [{
        required: true,
        message: '请输入占地面积',
        type: 'integer',
        trigger: 'blur'
      }],
      holdUserCount: [{
        required: true,
        message: '请输入容纳人数',
        type: 'integer',
        trigger: 'blur'
      }],
      meetRoomCount: [{
        required: true,
        message: '请输入会议室数',
        type: 'integer',
        trigger: 'blur'
      }],
      classRoomCount: [{
        required: true,
        message: '请输入教室数',
        type: 'integer',
        trigger: 'blur'
      }],
      profiles: [{
        required: true,
        message: '请输入简介',
        trigger: 'blur'
      }],
      coverImgUrl: [{
        required: true,
        message: '请上传封面图',
        trigger: 'change'
      }],
      actionGallery: [{
        required: true,
        type: "array",
        message: '请上传公示内容图集',
        trigger: 'change'
      }],
      spaceGallery: [{
        required: true,
        type: "array",
        message: '请上传标识标牌图集',
        trigger: 'change'
      }],
      roomGallery: [{
        type: "array",
        required: true,
        message: '请上传总体布局图集',
        trigger: 'change'
      }],
      deviceGallery: [{
        type: "array",
        required: true,
        message: '请上传设备设施版块图集',
        trigger: 'change'
      }],
      resourceIds: [{
        type: "array",
        trigger: 'change'
      }]
    }
  }
}