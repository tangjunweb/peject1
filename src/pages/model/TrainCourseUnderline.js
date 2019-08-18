import BaseModel from './BaseModel'
export default class TrainCourseUnderline extends BaseModel {
    id = "";
    trainClassId = "";
    courseName = "";
    courseType = '2';
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
    baseLibrary = {
    };
    teacherLibrary = {
    };
    constructor(props = {}) {
        super();
        Object.assign(this, props);
        this.courseType = this.courseType + '';
    }
    static setModels(model) {
        let d = TrainCourseUnderline.getModel(model);
        d.baseLibraryName = d.baseLibrary.name;
        d.baseBelongType = d.baseLibrary.type;
        d.baseLibraryId = d.baseLibrary.id;
        d.teacherLibraryId = d.teacherLibrary.id;
        d.teacherName = d.teacherLibrary.name;
        delete d.baseLibrary;
        delete d.teacherLibrary;
        return d;
    }
    static getModels(model) {
        let d = TrainCourseUnderline.getModel(model);
        d.courseType = '2'
        d.baseLibrary = {
            name: d.baseLibraryName,
            id: d.baseLibraryId,
            type: d.baseBelongType
        }
        d.teacherLibrary = {
            name: d.teacherName,
            id: d.teacherLibraryId,
        }
        return d;
    }
    static getRules(context) {
        return {
            courseName: [{
                required: true,
                trigger: 'blur',
                message: '请输入课程名称'
            }, {
                max: 200,
                message: '课程名称不能超过200个字符'
            }],
            startTime: [{
                required: true,
                trigger: 'change',
                message: '请选择开始时间'
            }, {
                trigger: 'change',
                validator(rule, value, callback) {
                    if (value && context.model.endTime) {
                        let st = (new Date(context.model.endTime)).getTime();
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
                message: '请选择结束时间'
            }, {
                trigger: 'change',
                validator(rule, value, callback) {
                    if (value && context.model.startTime) {
                        let st = (new Date(context.model.startTime)).getTime();
                        let ct = (new Date(value)).getTime();
                        if (ct < st) {
                            callback(new Error('结束时间不能早于开始时间'));
                        } else {
                            callback();
                        }
                    } else {
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