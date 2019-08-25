import axios from './axios'
/**
 * 用户登录
 * @param {code,codeId,userName,password} params
 */
export function Sigin(params) {
    return axios.post('/api/TokenAuth/Sigin', params)
}

/**
 * 刷新token
 * @param {id} params
 */
export function UserChangeRole(params) {
    return axios.get('/api/TokenAuth/UserChangeRole', params)
}


/**
 * 微信登陆
 */
export function WeChatOpenAuthByToken(params) {
    return axios.post('/api/TokenAuth/WeChatOpenAuthByToken', params)
}

/**
 * 微信绑定
 */
export function SiginAndBindWeChat(params) {
    return axios.post('/api/TokenAuth/SiginAndBindWeChat', params)
}

/**
 * 获取用户信息
 */
export function GetAccountInfo(params) {
    return axios.get('/api/services/app/User/Get', params)
}
/**
 * 获取所有码表
 */
export function GetAllBaseCodes(params) {
    return axios.get('/api/services/app/BaseCode/GetAllBaseCodes', params)
}
/**
 * 获取所有码表类型
 */
export function GetBaseCodeTypes(params) {
    return axios.get('/api/services/app/BaseCode/GetBaseCodeTypes', params)
}
/**
 * 创建码表类型
 */
export function CreateBaseCodeType(params) {
    return axios.post('/api/services/app/BaseCode/CreateBaseCodeType', params)
}
/**
 * 删除码表类型
 */
export function DeleteBaseCodeType(params) {
    return axios.del('/api/services/app/BaseCode/DeleteBaseCodeType', params)
}
/**
 * 获取码表
 */
export function GetBaseCodeByTypeOrParentValue(params) {
    return axios.get('/api/services/app/BaseCode/GetBaseCodeByTypeOrParentValue', params)
}
/**
 * 添加或者修改码表
 */
export function CreateOrUpdateBaseCode(params) {
    return axios.post('/api/services/app/BaseCode/CreateOrUpdateBaseCode', params)
}
export function DeleteBaseCode(params) {
    return axios.del('/api/services/app/BaseCode/DeleteBaseCode', params)
}
/**
 * 获取所有权限
 */
export function GetPermission(params) {
    return axios.get('/api/services/app/Permission/GetAllPermission', params)
}

/**
 * 获取菜单权限(渠道版)------此处修改
 */
export function GetMenuList(params) {
    return axios.get('/api/services/app/MenuButton/List', params)
}

/**
 * 克隆菜单权限
 */
export function MenuClone(params) {
    return axios.post('/api/services/app/MenuButton/Clone', params)
}

/**
 * 设置角色菜单权限
 */

export function SetRoleMenu(params) {
    return axios.post('/api/services/app/MenuButton/SetRoleMenu', params)
}

/**
 *  获取角色菜单权限
 */

export function RoleMenusList(params) {
    return axios.get('/api/services/app/MenuButton/RoleMenusList', params)
}

/**
 * 获取租户菜单权限
 */
export function TenantMenusList(params) {
    return axios.get('/api/services/app/MenuButton/TenantMenusList', params)
}


/**
 * 根据租户ID获取菜单权限
 */
export function TenantMenusIdList(params) {
    return axios.get('/api/services/app/MenuButton/TenantMenusIdList', params)
}

/**
 * 设置角色菜单权限
 */
export function SetTenantMenu(params) {
    return axios.post('/api/services/app/MenuButton/SetTenantMenu', params)
}

/**
 * 创建菜单权限
 */
export function MenuCreate(params) {
    return axios.post('/api/services/app/MenuButton/Create', params)
}

/**
 * 编辑菜单权限
 */

export function MenuUpdate(params) {
    return axios.put('/api/services/app/MenuButton/Update', params)
}

/**
 * 删除菜单
 */
export function MenuDelete(params) {
    return axios.del('/api/services/app/MenuButton/Delete', params)
}

/**
 * 获取当前所有权限
 */
export function GetCurrentTanentPermission(params) {
    return axios.get('/api/services/app/Permission/GetCurrentUserPermission', params)
}
/**
 * 获取角色权限
 */
export function GetRolePermission(params) {
    return axios.get('/api/services/app/Permission/GetRolePermission', params)
}

/**
 * 创建项目
 */
export function CreateProject(params) {
    return axios.post('/api/services/app/Project/CreateProject', params)
}
/**
 * 更新项目
 */
export function ModifyProject(params) {
    return axios.post('/api/services/app/Project/ModifyProject', params)
}
/**
 * 删除项目
 */
export function DeleteProject(params) {
    return axios.del('/api/services/app/Project/DeleteProject', params)
}
/**
 * 禁用项目
 */
export function DisableProject(params) {
    return axios.post('/api/services/app/Project/DisableProject', params)
}
/**
 * 启用项目
 */
export function EnableProject(params) {
    return axios.post('/api/services/app/Project/EnableProject', params)
}
/**
 * 项目列表分页
 */
export function GetPageProjectList(params) {
    return axios.get('/api/services/app/Project/GetPageProjectList', params)
}
/**
 * 获取项目详情
 */
export function GetProjectById(params) {
    return axios.get('/api/services/app/Project/GetProjectById', params)
}

/**
 *  获取上级组织
 */

export function SearchSups(params) {
    return axios.get('/api/services/app/Organization/SearchSups', params)
}
/**
 * 获取下级党组织
 */
export function GetListByParentIdAsync(params) {
    return axios.get('/api/services/app/Organization/GetListByParentIdAsync', params)
}

/**
 * 获取所有组织
 */

export function GetListAsync(params) {
    return axios.get('/api/services/app/Organization/GetListAsync', params)
}

/**
 * 创建组织
 */
export function CreateAsync(params) {
    return axios.post('/api/services/app/Organization/CreateAsync', params)
}
/**
 * 获取单位
 */
export function GetUnitlistByFilterAsync(params) {
    return axios.get('/api/services/app/Unit/GetUnitlistByFilterAsync', params)
}
/**
 * 获取所有单位
 * @param {*} params
 */
export function GetAllUnitAsync(params) {
    return axios.get('/api/services/app/Unit/GetAllUnitAsync', params)
}
/**
 * 创建单位
 */
export function CreateUnitAsync(params) {
    return axios.post('/api/services/app/Unit/CreateUnitAsync', params)
}
/**
 * 创建党组织
 */
export function CreatePartyOrgnizationAsync(params) {
    return axios.post('/api/services/app/PartyOrganizationService/CreatePartyOrgnizationAsync', params)
}
/**
 * 党员列表
 */
export function PartyMemberList(params) {
    return axios.post('/api/services/app/PartyMemberService/PageList', params)
}
/**
 * 角色列表
 */
export function GetPageRoleList(params) {
    return axios.get('/api/services/app/Role/GetVisiblePageRoleList', params)
}
export function GetPermissonsName(params) {
    return axios.get('/api/services/app/Role/GetPermissonsName', params)
}

export function RoleCreate(params) {
    return axios.post('/api/services/app/Role/Create', params)
}
export function RoleUpdate(params) {
    return axios.put('/api/services/app/Role/Update', params)
}
export function RoleDelete(params) {
    return axios.del('/api/services/app/Role/Delete', params)
}
export function GetRoleForEdit(params) {
    return axios.get('/api/services/app/Role/GetRoleForEdit', params)
}
export function GetAllRole(params) {
    return axios.get('/api/services/app/Role/GetVisibleRoleList', params)
}
export function GetAllRoleList(params) {
    return axios.get('/api/services/app/Role/GetVisibleRoleList', params)
}
/**
 * 获取用户可分配角色
 */
export function GetRoleLevelList(params) {
    return axios.get('/api/services/app/Role/GetRoleLevelList', params)
}
/**
 * 创建组织
 */
export function CreateOrgnizationAsync(params) {
    return axios.post('/api/services/app/Organization/CreatePartyOrgnizationAsync', params)
}
export function GetOrgnizationByIdAsync(params) {
    return axios.get('/api/services/app/Organization/GetChildOrgnizationByIdAsync', params)
}
export function GetUploadAuthor(params) {
    return axios.get('/api/services/app/VodService/GetUploadAuthor', params)
}
export function GetVideoPlayAuth(params) {
    return axios.get('/api/services/app/VodService/GetVideoPlayAuth', params)
}
export function GetUpLoadAuth(params) {
    return axios.get('/api/services/app/ResourceLibaryService/GetUpLoadAuth', params)
}
/**
 * 管理员
 */
export function UserDelete(params) {
    return axios.del('/api/services/app/User/Delete', params)
}
export function AdminPageList(params) {
    return axios.get('/api/services/app/User/AdminPageList', params)
}
export function CreateAdminAsync(params) {
    return axios.post('/api/services/app/User/CreateAdminAsync', params)
}
export function SetAdminActiveAsync(params) {
    return axios.post('/api/services/app/User/SetAdminActiveAsync', params)
}
export function UpdateAdminAsync(params) {
    return axios.put('/api/services/app/User/UpdateAdminAsync', params)
}
export function GetAdminAsync(params) {
    return axios.get('/api/services/app/User/GetAdminAsync', params)
}
/**
 * 大屏
 */
export function GetPageBigScreenInfoList(params) {
    return axios.get('/api/services/app/BigScreenService/GetPageBigScreenInfoList', params)
}

export function GetPageBigScreenInfoListOrgan(params) {
    return axios.get('/api/services/app/BigScreenService/GetPageBigScreenInfoListOrgan', params)
}

export function GetPageBigScreenInfoListOrganSet(params) {
    return axios.get('/api/services/app/BigScreenService/GetPageBigScreenInfoListOrganSet', params)
}
export function GetBigScreenSiteList(params) {
    return axios.get('/api/services/app/NewsService/SiteList', params)
}
export function GetBigScreenInfoById(params) {
    return axios.get('/api/services/app/BigScreenService/GetBigScreenInfoById', params)
}
export function DeleteBigScreenInfo(params) {
    return axios.del('/api/services/app/BigScreenService/DeleteBigScreenInfo', params)
}
export function ModifyBigScreenInfo(params) {
    return axios.post('/api/services/app/BigScreenService/ModifyBigScreenInfo', params)
}
export function GetPageBigScreenVersionList(params) {
    return axios.get('/api/services/app/BigScreenService/GetPageBigScreenVersionList', params)
}
export function ModifyBigScreenVersion(params) {
    return axios.post('/api/services/app/BigScreenService/ModifyBigScreenVersion', params)
}
export function GetBigScreenVersionById(params) {
    return axios.get('/api/services/app/BigScreenService/GetBigScreenVersionById', params)
}
export function GetPageInfoByVersionIdList(params) {
    return axios.get('/api/services/app/BigScreenService/GetPageInfoByVersionIdList', params)
}
export function SetBigScreenVersion(params) {
    return axios.post('/api/services/app/BigScreenService/SetBigScreenVersion', params)
}
export function CreateBigScreenVersion(params) {
    return axios.post('/api/services/app/BigScreenService/CreateBigScreenVersion', params)
}
export function DeleteBigScreenVersion(params) {
    return axios.del('/api/services/app/BigScreenService/DeleteBigScreenVersion', params)
}
export function GetBigScreenVideo(params) {
    return axios.get('/api/services/app/BigScreenService/GetBigScreenVideo', params)
}
export function AddBigScreenVideo(params) {
    return axios.post('/api/services/app/BigScreenService/AddBigScreenVideo', params)
}
export function DeleteScreenVideo(params) {
    return axios.del('/api/services/app/BigScreenService/DeleteScreenVideo', params)
}
export function GetPagedBigScreenNewsByType(params) {
    return axios.get('/api/services/app/NewsService/GetPagedBigScreenNewsByType', params)
}
export function GetPagedBigScreenNewsSetByType(params) {
    return axios.get('/api/services/app/NewsService/GetPagedBigScreenNewsSetByType', params)
}
export function CreateBigScreenNews(params) {
    return axios.post('/api/services/app/BigScreenService/CreateBigScreenNews', params)
}
export function DeleteBigScreenNews(params) {
    return axios.del('/api/services/app/BigScreenService/DeleteBigScreenNews', params)
}


export function GetPagedOrganBsConcern(params) {
    return axios.get('/api/services/app/BigScreenConcernService/GetPagedOrganBsConcern', params)
}
export function DeleteBsConcer(params) {
    return axios.del('/api/services/app/BigScreenConcernService/DeleteBsConcer', params)
}
export function BackConcern(params) {
    return axios.post('/api/services/app/BigScreenConcernService/BackConcern', params)
}
export function GetBigScreenConcernById(params) {
    return axios.get('/api/services/app/BigScreenConcernService/GetBigScreenConcernById', params)
}

export function GetPageBigScreenRegistCodeList(params) {
    return axios.get('/api/services/app/BigScreenService/GetPageBigScreenRegistCodeList', params)
}

export function GetRegistCodebyId(params) {
    return axios.get('/api/services/app/BigScreenService/GetRegistCodebyId', params)
}
export function DeleteRegistCodebyId(params) {
    return axios.del('/api/services/app/BigScreenService/DeleteRegistCodebyId', params)
}

export function GetBsMeetingInfoById(params) {
    return axios.get('/api/services/app/PartyMeetingService/GetBsMeetingInfoById', params)
}

export function GetPagedBsPartyLifeMeetingList(params) {
    return axios.get('/api/services/app/PartyMeetingService/GetPagedBsPartyLifeMeetingList', params)
}

export function DeleteMeetingInfoById(params) {
    return axios.del('/api/services/app/PartyMeetingService/DeleteMeetingInfoById', params)
}

export function AddPartyMeetingUser(params) {
    return axios.post('/api/services/app/PartyMeetingService/AddPartyMeetingUser', params)
}

export function ModifyPartyMeetingInfo(params) {
    return axios.post('/api/services/app/PartyMeetingService/ModifyPartyMeetingInfo', params)
}

export function CreatePartyMeetingInfo(params) {
    return axios.post('/api/services/app/PartyMeetingService/CreatePartyMeetingInfo', params)
}

export function AddVideoMeetingBs(params) {
    return axios.post('/api/services/app/PartyMeetingService/AddVideoMeetingBs', params)
}

export function DeletePartyMeetingUser(params) {
    return axios.del('/api/services/app/PartyMeetingService/DeletePartyMeetingUser', params)
}

export function GetPageBigScreenResourcesList(params) {
    return axios.get('/api/services/app/BigScreenService/GetPageBigScreenResourcesList', params)
}

export function CreateBigScreenResourcesInfo(params) {
    return axios.post('/api/services/app/BigScreenService/CreateBigScreenResourcesInfo', params)
}


export function AddBigScreenResourceMap(params) {
    return axios.post('/api/services/app/BigScreenService/AddBigScreenResourceMap', params)
}

export function DelBigScreenResourceMap(params) {
    return axios.post('/api/services/app/BigScreenService/DelBigScreenResourceMap', params)
}

export function DelBigScreenResource(params) {
    return axios.post('/api/services/app/BigScreenService/DelBigScreenResource', params)
}

export function FindPassword(params) {
    return axios.post('/api/services/app/User/FindPassword', params)
}
export function PhoneNumberConfirmed(params) {
    return axios.post('/api/services/app/User/PhoneNumberConfirmed', params)
}
export function SendPhoneVierifCode(params) {
    return axios.post('/api/services/app/User/SendPhoneVierifCode', params)
}
export function UpdatePassword(params) {
    return axios.post('/api/services/app/User/UpdatePassword', params)
}
export function UserExaminationRuleList(params) {
    return axios.get('/api/services/app/ExaminationService/UserExaminationRuleList', params)
}
export function OrganExaminationRuleList(params) {
    return axios.get('/api/services/app/ExaminationService/OrganExaminationRuleList', params)
}
export function SetUserExRuleForCurrentYear(params) {
    return axios.post('/api/services/app/ExaminationService/SetUserExRuleForCurrentYear', params)
}
export function SetOrganExRuleForCurrentYear(params) {
    return axios.post('/api/services/app/ExaminationService/SetOrganExRuleForCurrentYear', params)
}
// export function SiteList(params) {
//     return axios.get('/api/services/app/NewsService/SiteList', params)
// }


export function GetCurrentUserPermissionNames(params) {
    return axios.get('/api/services/app/Permission/GetCurrentUserPermissionNames', params)
}

/**
 * 获取当前登录用户权限
 */
export function GetCurrentUserMenuButton(params) {
    return axios.get('/api/services/app/MenuButton/GetCurrentUserMenuButton', params)
}

/**
 * 获取当前用户创建的通知公告列表
 */
export function AnnouncemenPageList(params) {
    return axios.get('/api/services/app/Announcement/AnnouncemenPageList', params)
}

/**
 * 获取当前用户未读的通知公告数
 */
export function GetUnreadAnnouncemenCount(params) {
    return axios.get('/api/services/app/Announcement/GetUnreadAnnouncemenCount', params)
}


/**
 * 创建通知公告
 */
export function CreateAnnouncement(params) {
    return axios.post('/api/services/app/Announcement/Create', params)
}

/**
 * 当前发送给当前用户的通知公告列表
 */
export function SeeAnnouncemenPageList(params) {
    return axios.get('/api/services/app/Announcement/SeeAnnouncemenPageList', params)
}

/**
 * 更新通知公告
 */
export function UpdateAnnouncement(params) {
    return axios.put('/api/services/app/Announcement/Update', params)
}

/**
 * 删除通知公告
 */
export function DeleteAnnouncement(params) {
    return axios.del('/api/services/app/Announcement/Delete', params)
}

/**
 * 查看通知公告详情
 */
export function GetAnnouncement(params) {
    return axios.get('/api/services/app/Announcement/GetAnnouncement', params)
}

/**
 * 发送通知公告
 */
export function SendAnnouncement(params) {
    return axios.post('/api/services/app/Announcement/SendAnnouncement', params)
}

/**
 * 获取编辑通知公告详情
 */
export function GetEditAnnouncement(params) {
    return axios.get('/api/services/app/Announcement/GetEditAnnouncement', params)
}

/**
 * 获取意见建议列表
 */
export function OpinionsPageList(params) {
    return axios.get('/api/services/app/Opinions/OpinionsPageList', params)
}

/**
 * 创建意见建议
 */
export function OpinionsCreate(params) {
    return axios.post('/api/services/app/Opinions/Create', params)
}

/**
 * 更新意见建议
 */
export function OpinionsUpdate(params) {
    return axios.post('/api/services/app/Opinions/Update', params)
}

/**
 * 获取意见建议详情
 */
export function GetOpinionsDetails(params) {
    return axios.get('/api/services/app/Opinions/GetOpinionsDetails', params)
}

/**
 * 删除意见建议
 */
export function OpinionsDelete(params) {
    return axios.post('/api/services/app/Opinions/Delete', params)
}

/**
 * 审核列表
 */
export function GetAuditOpinionsPageList(params) {
    return axios.get('/api/services/app/Opinions/GetAuditOpinionsPageList', params)
}

/**
 * 新建意见建议回复
 */
export function SubmitOpinionsReplyHandle(params) {
    return axios.post('/api/services/app/Opinions/SubmitOpinionsReplyHandle', params)
}

/**
 * 根据类别获取评估选项 1：简单版本；2：完整版本
 */
export function GetEvaluationItemByTemplateType(params) {
    return axios.get('/api/services/app/TrainClassService/GetEvaluationItemByTemplateType', params)
}

/**
 * 新增效果评估详情
 */
export function AddEvaluationResult(params) {
    return axios.post('/api/services/app/TrainClassService/AddEvaluationResult', params)
}

export function UpdateFaceImgCode(params) {
    return axios.post('/api/services/app/User/UpdateFaceImgCode', params)
}
export async function SiginFaceImgCode(params) {
    return axios.post('/api/TokenAuth/SiginFaceImgCode', params)
}

/**
 * 平台概况-总体分析统计接口
 */
export function GetHomeEnsembleStatistics(params) {
    return axios.get('/api/services/app/StatisticsService/GetHomeEnsembleStatistics', params)
}

/**
 * 党员教育-线上培训的统计接口
 */
export function GetTrainClassOnlineStatistics(params) {
    return axios.get('/api/services/app/StatisticsService/GetTrainClassOnlineStatistics', params)
}

/**
 * 平台概况-组织空间统计接口
 */
export function GetHomeOrganizationalStatistics(params) {
    return axios.get('/api/services/app/StatisticsService/GetHomeOrganizationalStatistics', params)
}

/**
 * 平台概况-线下培训的统计接口
 */
export function GetTrainClassUnderStatistics(params) {
    return axios.get('/api/services/app/StatisticsService/GetTrainClassUnderStatistics', params)
}

/**
 * 党员教育-测评中心统计接口
 */
export function GetExamPaperStatistics(params) {
    return axios.get('/api/services/app/StatisticsService/GetExamPaperStatistics', params)
}


/**
 * 党织活动-组织生活按月统计接口
 */
export function GetPartyMeetingStatisticsMonth(params) {
    return axios.get('/api/services/app/StatisticsService/GetPartyMeetingStatisticsMonth', params)
}

/**
 * 组织互动-组织生活按季度统计接口
 */
export function GetPartyMeetingStatisticsQuarter(params) {
    return axios.get('/api/services/app/StatisticsService/GetPartyMeetingStatisticsQuarter', params)
}

/**
 * 组织互动-组织生活 支部获取统计数据
 */
export function GetPartyMeetingStatisticsOne(params) {
    return axios.get('/api/services/app/StatisticsService/GetPartyMeetingStatisticsOne', params)
}

/**
 * 通知公告
 */
export function NotifyPageListAsync(params) {
    return axios.get('/api/services/app/Notify/PageListAsync', params)
}

/**
 * 积分规则的初始化
 */
export function PartyCreditRuleSettingsInit(params) {
    return axios.get('/api/services/app/PartyCreditRuleSettings/Init', params)
}

/**
 * 积分规则的修改
 */
export function PartyCreditRuleSettingsUpdate(params) {
    return axios.post('/api/services/app/PartyCreditRuleSettings/Update', params)
}

/**
 * 积分规则的查询列表
 */
export function PartyCreditRuleSettingsList(params) {
    return axios.post('/api/services/app/PartyCreditRuleSettings/List', params)
}