import BaseModel from "./BaseModel";
export default class BonusPenalty extends BaseModel {
    id = '';
    userId = '';
    bonnusPenaltyName = '';
    approvalDate = '';
    revocationDate = '';
    instruction = '';
    approvaOrganId = '';
    attachMent = {};
    constructor (props = {}) {
        super();
        Object.assign(this,props);
        if(!this.attachMent){
            this.attachMent = {
                type: '0',
                name: '',
                path: '',
                size: '',                
            }
        }
    }
    static getRules () {
        return {
            bonnusPenaltyName: [{
                required: true,
                message: '请选择奖惩名称',
                trigger: 'change'
            }]
        }
    }
}