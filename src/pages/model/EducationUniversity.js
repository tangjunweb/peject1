import BaseModel from './BaseModel'
import { ValidateTel } from '@/utils/validate'
export default class EducationUniversity extends BaseModel {
  id = "";
  schoolName = '';
  category = '';
  teachType = "";
  address = "";
  contact = "";
  contactPhoneNumber = "";
  longitude = "";
  latitude = "";
  classCount = "";
  siteArea = "";
  classRoomCount = "";
  meetRoomCount = "";
  mealCount = "";
  bedCount = "";
  parkingCount = "";
  profiles = "";
  coverImgUrl = "";
  schoolDetails = "";
  unitId = "";
  declareUserName = "";
  declareDate = "";
  unitOpinions = "";
  organOpinions = "";
  state = "";
  declareCategory = "";
  containMinCout = "";
  containMaxCout = "";
  teachPlans = [];
  provideServices = [];
  constructor(props = {}) {
    super();
    Object.assign(this, props);
  }
  static getRules() {
    return {
      schoolName: [{
        required: true,
        trigger: 'blur',
        message: '请输入院校名称'
      }, {
        max: 100,
        message: '名称太长，不能超过100个字符'
      }],
      category: [{
        required: true,
        trigger: 'change',
        message: '请选择院校级别'
      }],
      teachType: [{
        required: true,
        trigger: 'change',
        message: '请选择教学方式'
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
        message: '请输入正确的联系电话',
        transform(value) {
          return Number(value);
        }
      }, {
        validator: ValidateTel
      }],
      address: [{
        required: true,
        trigger: 'change',
        message: '请选择院校地址'
      }, {
        max: 200,
        message: '地址太长，不能超过200个字符'
      }],
      classCount: [{
        required: true,
        message: '请输入同时开班数',
        type: 'integer',
        trigger: 'blur'
      }],
      siteArea: [{
        required: true,
        type: 'number',
        trigger: 'blur',
        message: '请输入场地面积',
      }, {
        trigger: 'blur',
        pattern: /^(([1-9]\d{0,4})|0)(\.\d{0,2})?$/,
        message: '场地面积保留小数点两位.99',
      }],
      classRoomCount: [{
        required: true,
        message: '请输入教室数',
        type: 'integer',
        trigger: 'blur'
      }],
      meetRoomCount: [{
        required: true,
        message: '请输入会议室数',
        type: 'integer',
        trigger: 'blur'
      }],
      mealCount: [{
        required: true,
        message: '请输入供餐人数',
        type: 'integer',
        trigger: 'blur'
      }],
      parkingCount: [{
        required: true,
        message: '请输入停车位',
        type: 'integer',
        trigger: 'blur'
      }],
      bedCount: [{
        required: true,
        message: '请输入住宿床位',
        type: 'integer',
        trigger: 'blur'
      }],
      containMinCout: [{
        required: true,
        message: '请输入最小容纳培训人数',
        type: 'integer',
        trigger: 'blur'
      }],
      containMaxCout: [{
        required: true,
        message: '请输入最大容纳培训人数',
        type: 'integer',
        trigger: 'blur'
      }],
      profiles: [{
        required: true,
        message: '请输入简介',
        trigger: 'blur'
      }],
      schoolDetails: [{
        required: true,
        message: '请输入院校详情',
        trigger: 'blur'
      }],
      coverImgUrl: [{
        required: true,
        message: '请上传封面图',
        trigger: 'change'
      }],
      declareDate: [{
        required: true,
        message: '请选择申报日期',
        type: 'date'
      }],
      declareUserName: [{
        required: true,
        message: '请填写申报人',
        trigger: 'blur'
      }],
      declareCategory: [{
        required: true,
        message: '请选择申报类型',
        trigger: 'change'
      }],
    }
  }
}