import BaseModel from './BaseModel'
import { ValidateIDCard } from '@/utils/validate'
export default class OrganTeam extends BaseModel {
    organId = '';
    leaderUserId = '';
    leaderUserName = '';
    groupName = '';
    estabTime = '';
    organGroupUsersDto = [];
    static getRules() {
        return {
            groupName: [{
                required: true,
                message: '请输入党小组名称',
                trigger: 'blur'
            }],
            leaderUserId: [{
                required: true,
                message: '请选择党小组组长',
                trigger: 'change'
            }]
        }
    }
    static getModels(model) {
        let d = OrganTeam.getModel(model);
        if (d.organGroupUsersDto.length) {
            let arr = []
            d.organGroupUsersDto.forEach(el => {
                arr.push({
                    userId: el.id
                })
            });
            d.organGroupUsersDto = arr;
        }
        return d;
    }
    static setModels(model) {
        console.log(model)
        let d = OrganTeam.getModel(model);
        d.organGroupUsersDto = d.groupUserListsDto;
        return d;
    }
    constructor(props = {}) {
        super();
        Object.assign(this, props);
    }
}
