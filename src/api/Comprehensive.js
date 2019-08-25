/** 党建综合服务接口 */
import axios from './axios'

const pre = '/api/services/app/Comprehensive'


/**********关联单位开始 *******/
/** 关联单位管理列表 */
export function PageAssociateDorganListAsync(params) {
    return axios.get(`${pre}/PageAssociateDorganListAsync`, params)
}

/** 关联单位创建 */
export function CreateZhAssociateDorganAsync(params) {
    return axios.post(`${pre}/CreateZhAssociateDorganAsync`, params)
}

/** 获取关联单位详情 */
export function GetZhAssociateDorganDetails(params) {
    return axios.get(`${pre}/GetZhAssociateDorganDetails`, params)
}

/** 关联单位更新 */
export function UpdateAssociatedOrganAsync(params) {
    return axios.put(`${pre}/UpdateAssociatedOrganAsync`, params)
}

/** 删除关联单位管理 */
export function DeleteAssociateDorganAsync(params) {
    return axios.del(`${pre}/DeleteAssociateDorganAsync`, params)
}
/********** 关联单位结束 *******/


/********** 资源清单-获取当前用户（机关党组织）对应的村(社区)党组织 *******/
export function PageOfficeDorganListAsync(params) {
    return axios.get(`${pre}/PageOfficeDorganListAsync`, params)
}
/********** 创建资源清单 *******/
export function CreateZhResourceInventoryAsync(params) {
    return axios.post(`${pre}/CreateZhResourceInventoryAsync`, params)
}
/********** 资源清单管理列表 *******/
export function PageZhResourceInventoryAsync(params) {
    return axios.get(`${pre}/PageZhResourceInventoryAsync`, params)
}


/********** 资源清单更新 *******/
export function UpdateZhResourceInventoryAsync(params) {
    return axios.put(`${pre}/UpdateZhResourceInventoryAsync`, params)
}

/********** 删除资源清单 *******/
export function DeleteZhResourceInventoryAsync(params) {
    return axios.del(`${pre}/DeleteZhResourceInventoryAsync`, params)
}

/********** 获取资源清单详情 *******/
export function GetZhResourceInventoryDetails(params) {
    return axios.del(`${pre}/GetZhResourceInventoryDetails`, params)
}

/********** 需求清单 - 获取当前用户（村(社区)党组织）对应的机关党组织 *******/
export function PageVillageDorganListAsync(params) {
    return axios.get(`${pre}/PageVillageDorganListAsync`, params)
}


/********** 创建需求清单 *******/
export function CreateZhDemandInventoryAsync(params) {
    return axios.post(`${pre}/CreateZhDemandInventoryAsync`, params)
}
/********** 获取资源清单详情 *******/
export function GetZhDemandInventoryDetails(params) {
    return axios.del(`${pre}/GetZhDemandInventoryDetails`, params)
}
/********** 需求清单更新 *******/
export function UpdateZhDemandInventoryAsync(params) {
    return axios.put(`${pre}/UpdateZhDemandInventoryAsync`, params)
}
/********** 删除需求清单 *******/
export function DeleteZhDemandInventoryAsync(params) {
    return axios.del(`${pre}/DeleteZhDemandInventoryAsync`, params)
}

/********** 需求清单管理列表 *******/
export function PageZhDemandInventoryAsync(params) {
    return axios.get(`${pre}/PageZhDemandInventoryAsync`, params)
}
















