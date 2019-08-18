import axios from './axios'
export function VolActivityServiceApply(params) {
    return axios.post('/api/services/app/VolActivityService/Apply', params)
}
export function VolActivityServiceApplyCancel(params) {
    return axios.post('/api/services/app/VolActivityService/ApplyCancel', params)
}
export function VolActivityServiceSignIn(params) {
    return axios.post('/api/services/app/VolActivityService/SignIn', params)
}
export function VolActivityServiceMyVolActPageList(params) {
    return axios.get('/api/services/app/VolActivityService/MyVolActPageList', params)
}
export function VolActivityServicePublicPageList(params) {
    return axios.get('/api/services/app/VolActivityService/PublicPageList', params)
}
export function CreateDifficultyApply(params) {
    return axios.post('/api/services/app/DifficultyService/CreateDifficultyApply', params)
}
export function MyPayRecord(params) {
    return axios.get('/api/services/app/PartyDuesService/MyPayRecord', params)
}
export function PayPartyBues(params) {
    return axios.post('/api/services/app/PartyDuesService/PayPartyBues', params)
}
export function CancelCollectResource(params) {
    return axios.post('/api/services/app/ResourceLibaryService/CancelCollectResource', params)
}
export function GetUserCollectResourceList(params) {
    return axios.get('/api/services/app/ResourceLibaryService/GetUserCollectResourceList', params)
}
export function MyPaperPagedList(params) {
    return axios.get('/api/services/app/ExamPaperService/MyPaperPagedList', params)
}
export function MyErrorQuestionPageList(params) {
    return axios.get('/api/services/app/ExamPaperService/MyErrorQuestionPageList', params)
}
export function GetPaperQuestionByPaperId(params) {
    return axios.get('/api/services/app/ExamPaperService/GetPaperQuestionByPaperId', params)
}
export function GetCurrentPartyMemberInfo(params) {
    return axios.get('/api/services/app/PartyMemberService/GetCurrentPartyMemberInfo', params)
}
export function CurrentUserExamRecord(params) {
    return axios.get('/api/services/app/ExamPaperService/CurrentUserExamRecord', params)
}
export function SubmitPaperAnswer(params) {
    return axios.post('/api/services/app/ExamPaperService/SubmitPaperAnswer', params)
}


/**
 * 获取待办事项列表
 */
export function GetMyTaskTodoList(params) {
    return axios.get('/api/services/app/MyTaskTodoList/GetMyTaskTodoList', params)
}

/**
 * 获取试题解析
 */
export function ExamAnalysisPageList(params) {
    return axios.get('/api/services/app/ExamPaperService/ExamAnalysisPageList', params)
}

/**
 * 获取当前用户的所有考试错题集列表
 */
export function MyAllErrorQuestionPageList(params) {
    return axios.get('/api/services/app/ExamPaperService/MyAllErrorQuestionPageList', params)
}


/**
 * 获取当前用户的所有考试错题集列表
 */
export function UserStudyResrouceDetail(params) {
    return axios.post('/api/services/app/ResourceLibaryService/UserStudyResrouceDetail', params)
}

/**
 * 获取当前用户的所有考试错题集列表
 */
export function GetUserDayStudy(params) {
    return axios.get('/api/services/app/ExamPaperService/GetUserDayStudy', params)
}


/**
 * 我的资源学习记录
 */
export function MyResourceStudyRecordPageList(params) {
    return axios.get('/api/services/app/ResourceLibaryService/MyResourceStudyRecordPageList', params)
}

/*
 * 党课直播列表
 */
export function LiveManagePageList(params) {
    return axios.get('/api/services/app/Live/ManagePageList', params)
}
/*
 * 新建直播
 */
export function LiveCreate(params) {
    return axios.post('/api/services/app/Live/Create', params)
}

/*
 * 编辑直播
 */
export function LiveUpdate(params) {
    return axios.put('/api/services/app/Live/Update', params)
}

/*
 * 直播详情
 */
export function LiveInfo(params) {
    return axios.get('/api/services/app/Live/Get', params)
}

/*
 * 我的直播列表
 */
export function LivePageList(params) {
    return axios.get('/api/services/app/Live/PageList', params)
}

/*
 * 我的直播列表
 */
export function LiveAddUser(params) {
    return axios.post('/api/services/app/Live/AddUser', params)
}

/*
 * 我的直播列表
 */
export function LiveUserPageList(params) {
    return axios.get('/api/services/app/Live/UserPageList', params)
}

/*
 * 我的直播列表
 */
export function LiveDeleteUser(params) {
    return axios.del('/api/services/app/Live/DeleteUser', params)
}


/*
 * 获取推流地址
 */
export function LiveGetPushUrl(params) {
    return axios.get('/api/services/app/Live/GetPushUrl', params)
}

/*
 * 审核直播
 */
export function LiveAudit(params) {
    return axios.post('/api/services/app/Live/Audit', params)
}

/*
 * 删除直播
 */
export function LiveDelete(params) {
    return axios.del('/api/services/app/Live/Delete', params)
}

/*
 * 直播详情
 */
export function LiveDetail(params) {
    return axios.get('/api/services/app/Live/Detail', params)
}
/*
 * 头像
 */
export function UpdateUserHeadImage(params) {
    return axios.put('/api/services/app/PartyMemberService/UpdateUserHeadImage', params)
}

/*
 * 获取个人活动轨迹
 */
export function GetUserActivityTravelPagedList(params) {
    return axios.get('/api/services/app/ActivityTravelService/GetUserActivityTravelPagedList', params)
}

/*
 * 今日累计积分
 */
export function GetMyTodayStatistics(params) {
    return axios.get('/api/services/app/MemberCreditService/GetMyTodayStatistics', params)
}

/*
 * 近7日学习积分
 */
export function GetMy7DaysStatistics(params) {
    return axios.get('/api/services/app/MemberCreditService/GetMy7DaysStatistics', params)
}

/*
 * 查询党员积分统计(1个月)
 */
export function GetMyMonthlyStatistics(params) {
    return axios.get('/api/services/app/MemberCreditService/GetMyMonthlyStatistics', params)
}

/*
 * 查询党员积分明细(1天)
 */
export function GetMyDailyDetail(params) {
    return axios.get('/api/services/app/MemberCreditService/GetMyDailyDetail', params)
}

/*
 * 积分情况(支部平均分+全市平均分)
 */
export function GetMyWeeklyStatistics(params) {
    return axios.get('/api/services/app/MemberCreditService/GetMyWeeklyStatistics', params)
}



