import axios from './axios'

/**
 * 我的组织生活列表
 */
export function GetOrganLifePagedList(params) {
    return axios.get('/api/services/app/OrganizationalLife/GetOrganLifePagedList', params)
}
/**
 * 创建或者编辑组织生活
 */
export function CreateOrUpdateOrganLife(params) {
    return axios.post('/api/services/app/OrganizationalLife/CreateOrUpdateOrganLife', params)
}
/**
 * 查看详情（创建人或参与者）
 */
export function GetOrganLifeDetails(params) {
    return axios.get('/api/services/app/OrganizationalLife/GetOrganLifeDetails', params)
}
/**
 * 查看详情(审核人)
 */
export function GetOrganLifeDetailsByAudit(params) {
    return axios.get('/api/services/app/OrganizationalLife/GetOrganLifeDetailsByAudit', params)
}

/**
 * 修改前获取组织生活详情
 */
export function GetMyOrganLife(params) {
    return axios.get('/api/services/app/OrganizationalLife/GetMyOrganLife', params)
}
/**
 * 删除组织生活
 */
export function DeleteOrganLife(params) {
    return axios.del('/api/services/app/OrganizationalLife/DeleteOrganLife', params)
}
/**
 * 获取会议类型
 */
export function GetBaseCodeTypes(params) {
    return axios.get('/api/services/app/BaseCode/GetBaseCodeTypes', params)
}


/**
 * 开始组织生活
 */
export function StartOrganLife(params) {
    return axios.post('/api/services/app/OrganizationalLife/StartOrganLife', params)
}

/**
 * 取消组织生活
 */
export function CancelOrganLife(params) {
    return axios.post('/api/services/app/OrganizationalLife/CancelOrganLife', params)
}
/**
 * 新增人员
 */
export function CreateOrganPeople(params) {
    return axios.post('/api/services/app/OrganizationalLife/CreateOrganPeople', params)
}
/**
 * 
人员列表
 */
export function GetOrganPeoplePagedList(params) {
    return axios.get('/api/services/app/OrganizationalLife/GetOrganPeoplePagedList', params)
}
/**
 * 
删除人员
 */
export function DeleteOrganPeople(params) {
    return axios.del('/api/services/app/OrganizationalLife/DeleteOrganPeople', params)
}
/**
 * 
报名
 */
export function SignUpOrganPeople(params) {
    return axios.post('/api/services/app/OrganizationalLife/SignUpOrganPeople', params)
}
/**
 * 
上传活动纪实
 */
export function UploadOrganLifeRecord(params) {
    return axios.post('/api/services/app/OrganizationalLife/UploadOrganLifeRecord', params)
}



//组织生活审核列表



/**
 * 
 * 组织生活审核列表
 */
export function GetOrganLifeAuditPagedList(params) {
    return axios.get('/api/services/app/OrganizationalLife/GetOrganLifeAuditPagedList', params)
}
/**
 * 
 * 审核组织生活
 */
export function AuditOrganLife(params) {
    return axios.post('/api/services/app/OrganizationalLife/AuditOrganLife', params)
}
/**
 * 
 * 发布组织生活
 */
export function PublishOrganLife(params) {
    return axios.post('/api/services/app/OrganizationalLife/PublishOrganLife', params)
}

/**
 * 
 * 审核组织生活的活动纪实
 */
export function AuditOrganLifeRecord(params) {
    return axios.post('/api/services/app/OrganizationalLife/AuditOrganLifeRecord', params)
}