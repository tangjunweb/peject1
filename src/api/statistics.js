import axios from './axios'
export function GetPagedOrganDuesStatitics (params) {
    return axios.get('/api/services/app/StatisticsService/GetPagedOrganDuesStatitics', params)
}
export function GetPagedOrganDuesPayStatitics (params) {
    return axios.get('/api/services/app/StatisticsService/GetPagedOrganDuesPayStatitics', params)
}
export function GetOranStatistics (params) {
    return axios.get('/api/services/app/StatisticsService/GetOranStatistics', params)
}
export function GetUserStatitics (params) {
    return axios.get('/api/services/app/StatisticsService/GetUserStatitics', params)
}
export function GetPagedPartyMemberListStatitics (params) {
    return axios.get('/api/services/app/StatisticsService/GetPagedPartyMemberListStatitics', params)
}
export function GetPagedDifficultMemberListStatitics (params) {
    return axios.get('/api/services/app/StatisticsService/GetPagedDifficultMemberListStatitics', params)
}
export function GetOrganDevelopStatitics (params) {
    return axios.get('/api/services/app/StatisticsService/GetOrganDevelopStatitics', params)
}
export function GetPagedOrganDuesPayMonthStatitics (params) {
    return axios.get('/api/services/app/StatisticsService/GetPagedOrganDuesPayMonthStatitics', params)
}
export function GetOrganApprisalStatitics (params) {
    return axios.get('/api/services/app/StatisticsService/GetOrganApprisalStatitics', params)
}
export function GetOrganVolunteerStatitics (params) {
    return axios.get('/api/services/app/StatisticsService/GetOrganVolunteerStatitics', params)
}
export function GetOrganDevelopApplicationListStatitics (params) {
    return axios.get('/api/services/app/StatisticsService/GetOrganDevelopApplicationListStatitics', params)
}
export function GetOrganDevelopActiveListStatitics (params) {
    return axios.get('/api/services/app/StatisticsService/GetOrganDevelopActiveListStatitics', params)
}
export function GetOrganDevelopDevelopListStatitics (params) {
    return axios.get('/api/services/app/StatisticsService/GetOrganDevelopDevelopListStatitics', params)
}
export function GetOrganDevelopPreperListStatitics (params) {
    return axios.get('/api/services/app/StatisticsService/GetOrganDevelopPreperListStatitics', params)
}
export function GetOrganPartyLifeListStatitics (params) {
    return axios.get('/api/services/app/StatisticsService/GetOrganPartyLifeListStatitics', params)
}
export function OrganMatrixPageList (params) {
    return axios.get('/api/services/app/StatisticsService/OrganMatrixPageList', params)
}
