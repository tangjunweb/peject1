import BaseModel from './BaseModel'
import { ValidateTel } from '@/utils/validate'
export default class TeacherLibrary extends BaseModel {
    id = "";
    realName = "";
    headImage = "";
    gender = "";
    birthday = "";
    baseLibraryId = "";
    presentDuty = "";
    phoneNumber = "";
    degree = "";
    jobTitle = "";
    graduateSchool = "";
    recommendType = "";
    jobCategory = "";
    workExperience = "";
    teacherCategory = "";
    lectureCategory = "";
    email = "";
    trainExperience = "";
    academicAchievements = "";
    teachingStyle = "";
    teachingDirection = "";
    teachingCourse = [];
    constructor (props = {}) {
        super();
        Object.assign(this,props);
    }
    static getModels (model) {
        if(model.birthday&&model.birthday.Format){
            model.birthday = model.birthday.Format('yyyy-MM-dd');
        }
        return TeacherLibrary.getModel(model);
    }
    static getRules () {
        return {
            realName: [{
                required: true,
                trigger: 'blur',
                message: '请输入真实姓名'
            },{
                max: 50,
                message: '姓名长度不得超过50个字符'
            }],
            gender: [{
                required: true,
                trigger: 'change',
                message: '请选择性别'
            }],
            headImage: [{
                required: true,
                trigger: 'change',
                message: '请上传头像'
            }],
            phoneNumber: [{
                required: true,
                trigger: 'blur',
                message: '请输入手机号'
            },{
                validator: ValidateTel
            }]
        }
    }
}
