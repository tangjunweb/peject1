import axios from './axios'
export function PartyMemberDelete(params) {
    return axios.del('/api/services/app/PartyMemberService/Delete', params)
}
export function PartyMemberPageList(params) {
    return axios.get('/api/services/app/PartyMemberService/PageList', params)
}
export function PartyMemberCreate(params) {
    return axios.post('/api/services/app/PartyMemberService/Create', params)
}
export function UpdatePartyMemberInfo(params) {
    return axios.put('/api/services/app/PartyMemberService/UpdatePartyMemberInfo', params)
}
export function UpdateBonusPenalty(params) {
    return axios.put('/api/services/app/PartyMemberService/UpdateBonusPenalty', params)
}
export function DeleteBonusPenalty(params) {
    return axios.del('/api/services/app/PartyMemberService/DeleteBonusPenalty', params)
}
export function UpdateAbroad(params) {
    return axios.put('/api/services/app/PartyMemberService/UpdateAbroad', params)
}
export function DeleteAbroad(params) {
    return axios.del('/api/services/app/PartyMemberService/DeleteAbroad', params)
}
export function PartyMemberServiceGet(params) {
    return axios.get('/api/services/app/PartyMemberService/Get', params)
}
export function GetTeamMemberDetail(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetTeamMemberDetail', params)
}
export function SearchPageList(params) {
    return axios.get('/api/services/app/PartyMemberService/SearchPageList', params)
}

export function GetOrgnizationlistByNameAsync(params) {
    return axios.get('/api/services/app/PartyOrganizationService/GetOrgnizationlistByNameAsync', params)
}