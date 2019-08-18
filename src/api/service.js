import axios from './axios'

//民主评议
export function PageList (params) {
    return axios.get('/api/services/app/AppraisalService/PageList', params)
}
export function ResultPageList (params) {
    return axios.get('/api/services/app/AppraisalService/ResultPageList', params)
}
export function SetAppraisalResult (params) {
    return axios.post('/api/services/app/AppraisalService/SetAppraisalResult', params)
}
export function SetRecored (params) {
    return axios.post('/api/services/app/AppraisalService/SetRecored', params)
}

//党员发展计划管理
export function CreateDevelopmentPlan (params) {
    return axios.post('/api/services/app/DevelopmentPlanService/CreateDevelopmentPlan', params)
}
export function UpdateDevelopmentPlan (params) {
    return axios.put('/api/services/app/DevelopmentPlanService/UpdateDevelopmentPlan', params)
}
export function DeleteDevelopmentPlan (params) {
    return axios.del('/api/services/app/DevelopmentPlanService/DeleteDevelopmentPlan', params)
}
export function GetMyPagedOrganPlanList (params) {
    return axios.get('/api/services/app/DevelopmentPlanService/GetMyPagedOrganPlanList', params)
}
export function GetPagedChildOrganPlanList (params) {
    return axios.get('/api/services/app/DevelopmentPlanService/GetPagedChildOrganPlanList', params)
}
export function AssignDevelopmentCount (params) {
    return axios.post('/api/services/app/DevelopmentPlanService/AssignDevelopmentCount', params)
}
export function GetCurrentOrganAssignCount (params) {
    return axios.get('/api/services/app/DevelopmentPlanService/GetCurrentOrganAssignCount', params)
}
export function GetChildOrganReportSum (params) {
    return axios.get('/api/services/app/DevelopmentPlanService/GetChildOrganReportSum', params)
}

//党员发展管理
export function CreateDifficultyApply (params) {
    return axios.post('/api/services/app/DifficultyService/CreateDifficultyApply', params)
}
export function GetPagedDifficultyApplyList (params) {
    return axios.get('/api/services/app/DifficultyService/GetPagedDifficultyApplyList', params)
}
export function GetDifficultyApplyById (params) {
    return axios.get('/api/services/app/DifficultyService/GetDifficultyApplyById', params)
}
export function AuditApply (params) {
    return axios.post('/api/services/app/DifficultyService/AuditApply', params)
}
export function GetPagedDifficultyMemberInfo (params) {
    return axios.get('/api/services/app/DifficultyService/GetPagedDifficultyMemberInfo', params)
}
export function CreateDifficultyHelp (params) {
    return axios.post('/api/services/app/DifficultyService/CreateDifficultyHelp', params)
}
export function ModifyDifficultyHelp (params) {
    return axios.post('/api/services/app/DifficultyService/ModifyDifficultyHelp', params)
}
export function GetDifficultyHelpById (params) {
    return axios.get('/api/services/app/DifficultyService/GetDifficultyHelpById', params)
}
export function GetPagedDifficultyHelpList (params) {
    return axios.get('/api/services/app/DifficultyService/GetPagedDifficultyHelpList', params)
}
export function DeleteDifficultyHelp (params) {
    return axios.del('/api/services/app/DifficultyService/DeleteDifficultyHelp', params)
}
export function GetDifficultyMemberById (params) {
    return axios.get('/api/services/app/DifficultyService/GetDifficultyMemberById', params)
}
export function GetOrganCurrentYearReportCount (params) {
    return axios.get('/api/services/app/DevelopmentPlanService/GetOrganCurrentYearReportCount', params)
}
export function DeleteDifficultyMember (params) {
    return axios.del('/api/services/app/DifficultyService/DeleteDifficultyMember', params)
}
//党费收支
export function PayDuesPageList (params) {
    return axios.get('/api/services/app/PartyDuesService/PayDuesPageList', params)
}
export function PayPartyBues (params) {
    return axios.post('/api/services/app/PartyDuesService/PayPartyBues', params)
}
export function PayBasePageList (params) {
    return axios.get('/api/services/app/PartyDuesService/PayBasePageList', params)
}
export function UserPayBaseChangeRecordPageList (params) {
    return axios.get('/api/services/app/PartyDuesService/UserPayBaseChangeRecordPageList', params)
}
export function GetPayBase (params) {
    return axios.get('/api/services/app/PartyDuesService/GetPayBase', params)
}
export function SetPayBase (params) {
    return axios.post('/api/services/app/PartyDuesService/SetPayBase', params)
}
export function GetPayScle (params) {
    return axios.get('/api/services/app/PartyDuesService/GetPayScle', params)
}
export function AddPayOutRecord (params) {
    return axios.post('/api/services/app/PartyDuesService/AddPayOutRecord', params)
}
export function PayOutPageList (params) {
    return axios.get('/api/services/app/PartyDuesService/PayOutPageList', params)
}
//会议
export function CreatePartyMeetingInfo (params) {
    return axios.post('/api/services/app/PartyMeetingService/CreatePartyMeetingInfo' , params)
}



export function ModifyPartyMeetingInfo (params) {
    return axios.post('/api/services/app/PartyMeetingService/ModifyPartyMeetingInfo' , params)
}
export function GetMeetingInfoById (params) {
    return axios.get('/api/services/app/PartyMeetingService/GetMeetingInfoById' , params)
}

export function DeleteMeetingInfoById (params) {
    return axios.del('/api/services/app/PartyMeetingService/DeleteMeetingInfoById' , params)
}

export function AddPartyMeetingUser (params) {
    return axios.post('/api/services/app/PartyMeetingService/AddPartyMeetingUser' , params)
}
export function DeletePartyMeetingUser (params) {
    return axios.del('/api/services/app/PartyMeetingService/DeletePartyMeetingUser' , params)
}
export function GetPagedPartyLifeMeetingList (params) {
    return axios.get('/api/services/app/PartyMeetingService/GetPagedPartyLifeMeetingList' , params)
}
// 获取组织生活列表新
export function GetPagedPartyLifeMeetingNewList (params) {
    return axios.get('/api/services/app/PartyMeetingService/GetPagedPartyLifeMeetingNewList' , params)
}

export function AddMeetingAgendaRecord (params) {
    return axios.post('/api/services/app/PartyMeetingService/AddMeetingAgendaRecord' , params)
}
export function GetPagedMeetingUsers (params) {
    return axios.get('/api/services/app/PartyMeetingService/GetPagedMeetingUsers' , params)
}
export function GetMyPagedPartyLifeMeetingList (params) {
    return axios.get('/api/services/app/PartyMeetingService/GetMyPagedPartyLifeMeetingList' , params)
}
export function PartyMeetingSupplementSign (params) {
    return axios.post('/api/services/app/PartyMeetingService/PartyMeetingSupplementSign' , params)
}
export function AddMeetingUserComment (params) {
    return axios.post('/api/services/app/PartyMeetingService/AddMeetingUserComment' , params)
}
export function DeleteMeetingUserComment (params) {
    return axios.del('/api/services/app/PartyMeetingService/DeleteMeetingUserComment' , params)
}
export function GetMyMeetingComment (params) {
    return axios.post('/api/services/app/PartyMeetingService/GetMyMeetingComment' , params)
}
export function AddVideoMeetingBs (params) {
    return axios.post('/api/services/app/PartyMeetingService/AddVideoMeetingBs' , params)
}
export function GetMeetingComment (params) {
    return axios.get('/api/services/app/PartyMeetingService/GetMeetingComment', params)
}

//志愿者服务
export function StatisticsPageList (params) {
    return axios.get('/api/services/app/VolActivityService/StatisticsPageList' , params)
}
export function VolActivityServicePageList (params) {
    return axios.get('/api/services/app/VolActivityService/PageList' , params)
}
export function UserPageList (params) {
    return axios.get('/api/services/app/VolActivityService/UserPageList' , params)
}
export function VolActivityServiceGet (params) {
    return axios.get('/api/services/app/VolActivityService/Get' , params)
}
export function VolActivityServiceCreate (params) {
    return axios.post('/api/services/app/VolActivityService/Create' , params)
}
export function VolActivityServiceUpdate (params) {
    return axios.put('/api/services/app/VolActivityService/Update' , params)
}
export function VolActivityServiceApply (params) {
    return axios.post('/api/services/app/VolActivityService/Apply' , params)
}
export function AddUser (params) {
    return axios.post('/api/services/app/VolActivityService/AddUser' , params)
}
export function SignIn (params) {
    return axios.post('/api/services/app/VolActivityService/SignIn' , params)
}
export function SubmitSummary (params) {
    return axios.post('/api/services/app/VolActivityService/SubmitSummary' , params)
}
export function VolActivityServiceDelete (params) {
    return axios.del('/api/services/app/VolActivityService/Delete' , params)
}
export function DeleteUser (params) {
    return axios.del('/api/services/app/VolActivityService/DeleteUser' , params)
}
export function SignInSup (params) {
    return axios.post('/api/services/app/VolActivityService/SignInSup' , params)
}

export function CreateJoinPartyApply (params) {
    return axios.post('/api/services/app/DevelpmentMemberService/CreateJoinPartyApply', params)
}
export function GetPagedApplyList (params) {
    return axios.get('/api/services/app/DevelpmentMemberService/GetPagedApplyList', params)
}
export function GetPagedActiveList (params) {
    return axios.get('/api/services/app/DevelpmentMemberService/GetPagedActiveList', params)
}
export function GetDevelopmentApplyById (params) {
    return axios.get('/api/services/app/DevelpmentMemberService/GetDevelopmentApplyById', params)
}
export function TurnToActive (params) {
    return axios.post('/api/services/app/DevelpmentMemberService/TurnToActive', params)
}
export function TurnToDevelopment (params) {
    return axios.post('/api/services/app/DevelpmentMemberService/TurnToDevelopment', params)
}
export function TurnToPreparen (params) {
    return axios.post('/api/services/app/DevelpmentMemberService/TurnToPreparen', params)
}
export function TurnToFormal (params) {
    return axios.post('/api/services/app/DevelpmentMemberService/TurnToFormal', params)
}

export function GetUserPagedPartyLifeMeetingList  (params) {
    return axios.get('/api/services/app/PartyMeetingService/GetUserPagedPartyLifeMeetingList', params)
}
export function GetPagedNoAssignOrganPlanList (params) {
    return axios.get('/api/services/app/DevelopmentPlanService/GetPagedNoAssignOrganPlanList', params)
}

//流动党员管理
export function MovingRecordServiceApply (params) {
    return axios.post('/api/services/app/MovingRecordService/Apply', params)
}
export function MovingRecordServiceReApply (params) {
    return axios.post('/api/services/app/MovingRecordService/ReApply', params)
}
export function MovingRecordServicePageList (params) {
    return axios.get('/api/services/app/MovingRecordService/PageList', params)
}
export function MovingRecordServiceGet (params) {
    return axios.get('/api/services/app/MovingRecordService/Get', params)
}
export function MovingRecordServiceAudit (params) {
    return axios.post('/api/services/app/MovingRecordService/Audit', params)
}
export function MovingRecordServiceMyApply (params) {
    return axios.get('/api/services/app/MovingRecordService/MyApply', params)
}
export function MovingRecordServiceEndMoving (params) {
    return axios.post('/api/services/app/MovingRecordService/EndMoving', params)
}
//组织关系转接
export function OrganizationChangeServiceApply (params) {
    return axios.post('/api/services/app/OrganizationChangeService/Apply', params)
}
export function OrganizationChangeServiceReApply (params) {
    return axios.post('/api/services/app/OrganizationChangeService/ReApply', params)
}
export function OrganizationChangeServicePageList (params) {
    return axios.get('/api/services/app/OrganizationChangeService/PageList', params)
}
export function OrganizationChangeServiceGet (params) {
    return axios.get('/api/services/app/OrganizationChangeService/Get', params)
}
export function OrganizationChangeServiceAudit (params) {
    return axios.post('/api/services/app/OrganizationChangeService/Audit', params)
}
export function OrganizationChangeServiceMyApply (params) {
    return axios.get('/api/services/app/OrganizationChangeService/MyApply', params)
}
export function OrganizationChangeServiceHistoryPageList (params) {
    return axios.get('/api/services/app/OrganizationChangeService/HistoryPageList', params)
}
