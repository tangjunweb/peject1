import BaseModel from './BaseModel'
export default class ForumPost extends BaseModel {
    id = '';
    content = '';
    title = '';
    topMark = '';
    picList = [];
    defaultList = [];
    source = 1;
    constructor (props = {}) {
        super();
        Object.assign(this,props);
        if(this.picList.length){
            this.defaultList = this.picList.map(e=>{
                return {
                    name: e,
                    url: e
                }
            })
        }
    }
    static getRules () {
        return {
            title: [{
                required: true,
                trigger: 'blur',
                message: '请输入主题'
            }],
            content: [{
                required: true,
                trigger: 'change',
                message: '请输入内容'
            }]
        }
    }
}