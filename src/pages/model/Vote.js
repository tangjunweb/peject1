import BaseModel from './BaseModel'
export default class Vote extends BaseModel {
    forumPostsId = "";
    endTime = "";
    title = "";
    voteType = 1;
    optionList = [];
    constructor(props = {}) {
        super();
        Object.assign(this, props);
    }
    addOption() {
        let optionIndex;
        //console.log(optionIndex.charCodeAt())fromCharCode
        if (this.optionList.length) {
            let ac = this.optionList[this.optionList.length - 1].optionIndex.charCodeAt();
            optionIndex = String.fromCharCode(ac + 1);
        } else {
            optionIndex = 'A'
        }
        this.optionList.push({
            optionIndex,
            option: '',
        })
    }
    delOption(i) {
        this.optionList.splice(i, 1);
        let optionIndex = 65;
        this.optionList.forEach(e => {
            e.optionIndex = String.fromCharCode(optionIndex);
            optionIndex++;
        })
    }
    static getRules() {
        return {
            title: [{
                required: true,
                trigger: 'blur',
                message: '请输入投票主题'
            }],
            optionList: [{
                required: true,
                type: 'array',
                trigger: 'change',
                message: '请输入投票选项'
            }],
            endTime: [{
                required: true,
                trigger: 'change',
                message: '请选择投票结束时间',
                pattern: /.+/
            }, {
                validator(rule, value, callback) {
                    if (value) {
                        let ct = (new Date(value)).getTime();
                        let nt = (new Date()).getTime();
                        if (ct < nt) {
                            callback(new Error('投票结束时间必须大于当前时间'));
                        } else {
                            callback();
                        }
                    } else {
                        callback();
                    }
                }
            }]
        }
    }
}