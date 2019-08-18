import axios from './axios'
export function GetOrgnizationByIdAsync(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOrgnizationByIdAsync', params)
}
export function GetOrgnizationlistByFilterAsync(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOrgnizationlistByFilterAsync', params)
}
export function GetChildOrgnizationByIdAsync(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetChildOrgnizationByIdAsync', params)
}
export function GetRootOrgnizationByIdAsync(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetRootOrgnizationByIdAsync', params)
}
export function DeletePartyOrganizationAsync(params) {
    return axios.del('/api/services/app/PartyOrganizationService/DeletePartyOrganizationAsync', params)
}
export function CreatePartyOrgnizationAsync(params) {
    return axios.post('/api/services/app/PartyOrganizationService/CreatePartyOrgnizationAsync', params)
}
export function UpdatePartyOrgnizationAsync(params) {
    return axios.put('/api/services/app/PartyOrganizationService/UpdatePartyOrgnizationAsync', params)
}
export function GetOrganTeamMemberByGUIDAsync(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOrganTeamMemberByGUIDAsync', params)
}
export function CreateOrganTeamMemberAsync(params) {
    return axios.post('/api/services/app/PartyOrganizationService/CreateOrganTeamMemberAsync', params)
}
export function DeleteOrganTeamMemberGuidAsync(params) {
    return axios.del('/api/services/app/PartyOrganizationService/DeleteOrganTeamMemberGuidAsync', params)
}
export function UpdateOrganTeamMeberDtoAsync(params) {
    return axios.put('/api/services/app/PartyOrganizationService/UpdateOrganTeamMeberDtoAsync', params)
}
export function GetOrganTeamMeberByOrganIdAsync(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOrganTeamMeberByOrganIdAsync', params)
}
export function CreateOgranBonusPenaltyAsync(params) {
    return axios.post('/api/services/app/PartyOrganizationService/CreateOgranBonusPenaltyAsync', params)
}

export function DeleteOgranBonusPenaltyByGuidAsync(params) {
    return axios.del('/api/services/app/PartyOrganizationService/DeleteOgranBonusPenaltyByGuidAsync', params)
}
export function UpdateOrganBonusPenaltyAsync(params) {
    return axios.put('/api/services/app/PartyOrganizationService/UpdateOrganBonusPenaltyAsync', params)
}
export function GetOgranBonusPenaltyByGuidAsync(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOgranBonusPenaltyByGuidAsync', params)
}
export function GetOgranBonusPenaltyByOrganIdAsync(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOgranBonusPenaltyByOrganIdAsync', params)
}
export function CreateOrganReplacementAsync(params) {
    return axios.post('/api/services/app/PartyOrganizationService/CreateOrganReplacementAsync', params)
}
export function DeleteOrganReplacementByGuidAsync(params) {
    return axios.del('/api/services/app/PartyOrganizationService/DeleteOrganReplacementByGuidAsync', params)
}
export function UpdateOrganReplacementDtoAsync(params) {
    return axios.put('/api/services/app/PartyOrganizationService/UpdateOrganReplacementDtoAsync', params)
}
export function GetOrganReplacementByGuidAsync(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOrganReplacementByGuidAsync', params)
}
export function GetOrganReplacementByOrganIdAsync(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOrganReplacementByOrganIdAsync', params)
}
export function CreateOrganAssessmentAsync(params) {
    return axios.post('/api/services/app/PartyOrganizationService/CreateOrganAssessmentAsync', params)
}
export function DeleteOrganAssessmentByGuidAsync(params) {
    return axios.del('/api/services/app/PartyOrganizationService/DeleteOrganAssessmentByGuidAsync', params)
}
export function UpdateOrganAssessmentDtoAsync(params) {
    return axios.put('/api/services/app/PartyOrganizationService/UpdateOrganAssessmentDtoAsync', params)
}
export function GetOrganAssessmentByGuidAsync(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOrganAssessmentByGuidAsync', params)
}
export function GetOrganAssessmentByOrganIdAsync(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOrganAssessmentByOrganIdAsync', params)
}
export function PartyMemberStatisticsPageList(params) {
    return axios.get('/api/services/app/PartyOrganizationService/PartyMemberStatisticsPageList', params)
}
export function GetOrganAdminTeamMeberList(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOrganAdminTeamMeberList', params)
}
export function GetOrganPartyTeamMeberList(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOrganPartyTeamMeberList', params)
}
export function GetOrganTwoOneTeamMeberList(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOrganTwoOneTeamMeberList', params)
}
export function AuditPartyOrgnization(params) {
    return axios.post('/api/services/app/PartyOrganizationService/AuditPartyOrgnization', params)
}
//单位
export function CreateUnitAsync(params) {
    return axios.post('/api/services/app/Unit/CreateUnitAsync', params)
}
export function GetAllUnitAsync(params) {
    return axios.get('/api/services/app/Unit/GetAllUnitAsync', params)
}
export function GetUnitById(params) {
    return axios.get('/api/services/app/Unit/GetUnitById', params)
}
export function GetUnitByOrganId(params) {
    return axios.get('/api/services/app/Unit/GetUnitByOrganId', params)
}
export function UpdateUnitAsync(params) {
    return axios.put('/api/services/app/Unit/UpdateUnitAsync', params)
}
export function DeleteUnitAsync(params) {
    return axios.del('/api/services/app/Unit/DeleteUnitAsync', params)
}
export function UpdateBonusPenalty(params) {
    return axios.put('/api/services/app/PartyMemberService/UpdateBonusPenalty', params)
}
export function UpdateAbroad(params) {
    return axios.put('/api/services/app/PartyMemberService/UpdateAbroad', params)
}
export function DeleteAbroad(params) {
    return axios.del('/api/services/app/PartyMemberService/DeleteAbroad', params)
}
export function AuditingPageList(params) {
    return axios.get('/api/services/app/Unit/AuditingPageList', params)
}
export function AuditUnitAsync(params) {
    return axios.post('/api/services/app/Unit/AuditUnitAsync', params)
}
export function UnitPageList(params) {
    return axios.get('/api/services/app/Unit/PageList', params)
}
/**
 * 创建党小组基本信息
 */
export function CreateOrganGroupAsync(params) {
    return axios.post('/api/services/app/PartyOrganizationService/CreateOrganGroupAsync', params)
}

/**
 * 删除党小组基本信息
 */
export function DeleteOrganGroupByGuidAsync(params) {
    return axios.del('/api/services/app/PartyOrganizationService/DeleteOrganGroupByGuidAsync', params)
}

/**
 * 修改党小组基本信息
 */
export function UpdateOrganGroupAsync(params) {
    return axios.put('/api/services/app/PartyOrganizationService/UpdateOrganGroupAsync', params)
}

/**
 * 查询党小组列表信息
 */
export function GetOrganGroupListByOrganIdAsync(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOrganGroupListByOrganIdAsync', params)
}

/**
 * 查询党小组详情信息
 */
export function GetOrganGroupDetailsByIdAsync(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOrganGroupDetailsByIdAsync', params)
}

/**
 * 新增组织生活计划
 */
export function CreatePartyMeetingPlanInfo(params) {
    return axios.post('/api/services/app/PartyMeetingService/CreatePartyMeetingPlanInfo', params)
}

/**
 * 获取组织生活计划详情
 */
export function GetPartyMeetingPlanInfoById(params) {
    return axios.get('/api/services/app/PartyMeetingService/GetPartyMeetingPlanInfoById', params)
}

/**
 * 删除组织生活计划
 */
export function DeletePartyMeetingPlanInfoById(params) {
    return axios.del('/api/services/app/PartyMeetingService/DeletePartyMeetingPlanInfoById', params)
}

/**
 * 修改组织生活详情
 */
export function ModifyPartyMeetingPlanInfo(params) {
    return axios.post('/api/services/app/PartyMeetingService/ModifyPartyMeetingPlanInfo', params)
}


/**
 * 查询组织计划列表
 */
export function GetPartyMeetingPlanInfoList(params) {
    return axios.get('/api/services/app/PartyMeetingService/GetPartyMeetingPlanInfoList', params)
}

// 新版本-新增会议主表
export function CreatePaerentPartyMeetingNewInfo(params) {
    return axios.post('/api/services/app/PartyMeetingService/CreatePaerentPartyMeetingNewInfo', params)
}
// 新版本-编辑会议主表
export function ModifyPartyMeetingParentInfo(params) {
    return axios.post('/api/services/app/PartyMeetingService/ModifyPartyMeetingParentInfo', params)
}
// 新版本-获取会议信息
export function GetMeetingInfoNewById(params) {
    return axios.get('/api/services/app/PartyMeetingService/GetMeetingInfoNewById', params)
}
// 新版本-删除会议信息
export function DeleteParentMeetingInfoById(params) {
    return axios.del('/api/services/app/PartyMeetingService/DeleteParentMeetingInfoById', params)
}

// 新版本-新增会议子表
export function CreatePartyMeetingNewInfo(params) {
    return axios.post('/api/services/app/PartyMeetingService/CreatePartyMeetingNewInfo', params)
}
// 新版本-新增会议子表-添加活动纪实字段
export function CreatePartyMeetingInfo(params) {
    return axios.post('/api/services/app/PartyMeetingService/CreatePartyMeetingInfo', params)
}


// 新版本-编辑会议子表
export function ModifyPartyMeetingInfo(params) {
    return axios.post('/api/services/app/PartyMeetingService/ModifyPartyMeetingInfo', params)
}

// 新版本-删除子会议信息
export function DeleteMeetingInfoById(params) {
    return axios.del('/api/services/app/PartyMeetingService/DeleteMeetingInfoById', params)
}


// 新版本-获取参会人员
export function GetPagedMeetingUsers(params) {
    return axios.get('/api/services/app/PartyMeetingService/GetPagedMeetingUsers', params)
}
// 新版本-参会人员进行补签
export function PartyMeetingSupplementSign(params) {
    return axios.post('/api/services/app/PartyMeetingService/PartyMeetingSupplementSign', params)
}
// 新版本-参会人员请假
export function GetPartyMeetingUsersOffWorkList(params) {
    return axios.get('/api/services/app/PartyMeetingService/GetPartyMeetingUsersOffWorkList', params)
}
// 获取会议分页列表 -新版本
export function GetPagedPartyLifeMeetingNewList(params) {
    return axios.get('/api/services/app/PartyMeetingService/GetPagedPartyLifeMeetingNewList', params)
}
//新版本-新增会议议程表
export function CreatePartyMeetingAgenda(params) {
    return axios.post('/api/services/app/PartyMeetingService/CreatePartyMeetingAgenda', params)
}
//新版本-获取会议议程表（主题表Id
export function GetPartyMeetingAgendaLists(params) {
    return axios.get('/api/services/app/PartyMeetingService/GetPartyMeetingAgendaLists', params)
}
//新版本-人员提交请假
export function CreatePartyMeetingUsersOffWork(params) {
    return axios.post('/api/services/app/PartyMeetingService/CreatePartyMeetingUsersOffWork', params)
}
//新版本-修改人员请假
export function ModifyPartyMeetingUsersOffWork(params) {
    return axios.post('/api/services/app/PartyMeetingService/ModifyPartyMeetingUsersOffWork', params)
}
//新版本-审核人员请假
export function AuditUsersOffWork(params) {
    return axios.post('/api/services/app/PartyMeetingService/AuditUsersOffWork', params)
}
// 新版本-删除参会人员请假
export function DeletePartyMeetingUsersOffWork(params) {
    return axios.del('/api/services/app/PartyMeetingService/DeletePartyMeetingUsersOffWork', params)
}

// 组织生活签到，二维码
export const new_meeting_info = 'http://rcxf.wx.omtech.cn/chat/party/new_meeting_info/4susername/party'


// 获取支部委员会成员By组织ID
export function GetOrganBranchTeamMeberList(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOrganBranchTeamMeberList', params)
} 

// 新增支部委员会成员By组织ID
export function CreateOrganBranchTeamMeber(params) {
    return axios.post('/api/services/app/PartyOrganizationService/CreateOrganBranchTeamMeber', params)
} 


// 删除支部委员会成员By组织ID
export function DeleteOrganBranchTeamMeber(params) {
    return axios.del('/api/services/app/PartyOrganizationService/DeleteOrganBranchTeamMeber', params)
} 


// 获取当前登录用户党组织的所有成员
export function GetOrganizationUser(params) {
    return axios.get('/api/services/app/User/GetOrganizationUser', params)
} 

// 获取当前用户党小组成员信息
export function GetOrganGroupUserList(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOrganGroupUserList', params)
}
