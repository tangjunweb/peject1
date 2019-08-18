import BaseModel from "./BaseModel";
import { ValidateTel } from '@/utils/validate'
export default class Organization extends BaseModel {
    parentId = '';
    organType = '';
    organName = '';
    organCode = '';
    organPath = '';
    isOrganGroup = false;
    isBranch = false;
    domainType = '';
    sort = '';
    organAddress = '';
    unitId = '';
    latitude = '';
    longitude = '';
    unitSituation = '';
    secretaryId = '';
    contactor = '';
    contactPhone = '';
    contactMobilePhone = '';
    areaCode = '';
    organSetupMode = '';
    transactor = '';
    transactTime = '';
    transactorPhone = '';
    integrity = '';
    organPartyVerify = '';
    constructor(props = {}) {
        super();
        Object.assign(this, props);
    }
    static getRules() {
        return {
            parentId: [{
                required: true,
                message: '请选择上级党组织',
                trigger: 'change'
            }],
            organType: [{
                required: true,
                message: '请选择组织类别',
                trigger: 'change'
            }],
            domainType: [{
                required: true,
                message: '请选择领域分类',
                trigger: 'change'
            }],
            unitSituation: [{
                required: true,
                message: '请选择党组织所在单位情况',
                trigger: 'change'
            }],
            organName: [{
                required: true,
                message: '请输入组织名称',
                trigger: 'blur'
            }],
            contactor: [{
                required: true,
                message: '请输入党组织联系人',
                trigger: 'blur'
            }],
            contactMobilePhone: [{
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
            organAddress: [{
                required: true,
                message: '请输入党组织地址',
                trigger: 'blur'
            }],
            organCode: [{
                required: true,
                message: '请输入组织编码',
                trigger: 'blur'
            }],
            unitId: [{
                required: true,
                message: '请选择单位',
                trigger: 'change'
            }]
        }
    }
}
