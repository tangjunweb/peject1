//困难党员申请
import BaseModel from './BaseModel'
export default class DiffcultyApply extends BaseModel {
    id = "";
    difficultType = [];
    isLowAllowance = false;
    isNoWorkOldMember = false;
    isPensionBenefits = false;
    difficulInstruction = "";
    healthSituation = "";
    yearIncome = 0;
    helpType = "";
    constructor (props = {}) {
        super();
        Object.assign(this,props);
        this.isLowAllowance = !!this.isLowAllowance;
        this.isNoWorkOldMember = !!this.isNoWorkOldMember;
        this.isPensionBenefits = !!this.isPensionBenefits;
        if(typeof this.difficultType === 'string'){
            this.difficultType = this.difficultType.split(',');
        }
    }
    static getModels (model) {
        let models = DiffcultyApply.getModel(model);
        models.difficultType = models.difficultType.join(',');
        return models;
    }
    static getRules () {
        return {
            difficultType: [{
                required: true,
                trigger: 'change',
                type: 'array',
                message: '请选择困难类型'
            }] ,
            helpType: [{
                required: true,
                trigger: 'change',
                message: '请选择帮扶类型'
            }]                                                                              
        }
    }        
}