import BaseModel from './BaseModel'
export default class ReservationCreate extends BaseModel {
   id ="";
   bespokenTime ="";
   teachingTheme ="";
   teachingObject ="";
   teachingNums = 0;
   teachingDuration ="";
   teachingRemuneration ="";
   teachingCount ="";
   teachingEndTime ="";
   teachingPhone ="";
   specificAsk ="";
   bespokenManger = [];
    constructor(props = {}) {
        super();
        Object.assign(this, props);
    }
    static getRules() {
        return {
            teachingTheme: [{
                required: true,
                trigger: 'blur',
                message: '请输入授课主题'
            }, {
                max: 100,
                message: '名称太长，不能超过100个字符'
            }],
            teachingObject: [{
                required: true,
                trigger: 'blur',
                message: '请输入授课对象'
            }],
            teachingNums: [{
                required: true,
                message: '请输入授课人数',
                trigger: 'blur'
            }],
            teachingDuration: [{
                required: true,
                message: '请输入授课时长',
                trigger: 'blur'
            }],
            teachingRemuneration: [{
                required: true,
                message: '请选择授课报酬',
                trigger: 'change'
            }],
            teachingCount:[{
                required: true,
                message: '请输入需求数',
                trigger: 'blur'
            }],
            teachingEndTime:[{
                required: true,
                message: '请选择预约确定截止时间',
                trigger: 'change',
                type: 'date',
            }],
            bespokenTime:[{
                required: true,
                message: '请选择预约时间',
                trigger: 'change',
                type: 'date',
            }],
            teachingPhone: [{
                message: '请输入正确的联系人手机号码',
                trigger: 'blur',
                type: 'number',
                required: true,
                transform(value) {
                    if (value) {
                        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
                        if (!reg.test(value)) {
                            return false
                        } else {
                            return Number(value)
                        }
                    }
                }
            }],
        
        }
    }
}