import BaseModel from './BaseModel'
export default class TrainCourse extends BaseModel {
    id = "";
    trainClassId = "";
    courseName = "";
    courseType = '1';
    period = 0;
    startTime = "";
    endTime = "";
    description = "";
    baseLibraryId = "";
    teacherLibraryId = "";
    teacherName = "";
    address = "";
    longitude = 0;
    latitude = 0;
    constructor (props = {}) {
        super();
        Object.assign(this,props);
        this.courseType = this.courseType+'';
    }
    static getRules (context) {
        return {
            courseName: [{
                required: true,
                trigger: 'blur',
                message: '请输入课程名称'
            },{
                max: 200,
                message: '课程名称不能超过200个字符'
            }],
            startTime: [{
                required: true,
                trigger: 'change',
                message: '请选择开始时间'
            },{
                trigger: 'change',
                validator (rule, value, callback) {
                    if(value&&context.model.endTime){
                        let st = (new Date(context.model.endTime)).getTime();
                        let ct = (new Date(value)).getTime();                        
                        if(ct>st){
                            callback(new Error('开始时间不能晚于结束时间'));
                        }else{
                            callback();
                        }
                    }else{
                        callback();
                    }                    
                }
            }],
            endTime: [{
                required: true,
                trigger: 'change',
                message: '请选择结束时间'
            },{
                trigger: 'change',
                validator (rule, value, callback) {
                    if(value&&context.model.startTime){
                        let st = (new Date(context.model.startTime)).getTime();
                        let ct = (new Date(value)).getTime();                         
                        if(ct<st){
                            callback(new Error('结束时间不能早于开始时间'));
                        }else{
                            callback();
                        }
                    }else{
                        callback();
                    }
                }
            }],             
            courseType: [{
                required: true,
                trigger: 'change',
                message: '请选择课程类型'
            }],
            description: [{
                required: true,
                trigger: 'blur',
                message: '请输入课程概述'
            }]                              
        }
    }        
}