import {
    Sigin,
    GetAccountInfo,
    GetAllBaseCodes,
    GetAllRole,
    GetCurrentUserMenuButton,
    GetMenuList,
    GetUnreadAnnouncemenCount,
    WeChatOpenAuthByToken,
    SiginAndBindWeChat,
    UserChangeRole
} from '@/api'

import { GetCurrentPartyMemberInfo } from '@/api/student'
import PartyMember from '@/pages/model/PartyMember'
import axios from '@/api/axios'
// import {RouteInit} from '@/router/index'
export default {
    async getCurrentUserPermissionNames({
        commit,
        state
    }, payload) {
        try {
            let permissions = [];
            if (payload.refresh) {
                permissions = await GetCurrentUserMenuButton();
                localStorage.setItem(`${PREFIX}permissions`, JSON.stringify(permissions))
            } else {
                permissions = localStorage.getItem(`${PREFIX}permissions`);
                if (!permissions) {
                    permissions = await GetCurrentUserMenuButton();
                    localStorage.setItem(`${PREFIX}permissions`, JSON.stringify(permissions))
                } else {
                    permissions = JSON.parse(permissions);
                }
            }
            commit('UPDATESTATE', {
                permissions: permissions
            });
            return permissions;
        } catch (e) {
            throw e;
        }
    },
    async getAllResourceClassList({
        commit,
        state
    }, isForce = false) {
        try {
            let d;
            if (isForce || !state.resourceTypeLsit.length) {
                let res = await GetAllResourceClassList();
                d = res;
                commit('UPDATESTATE', {
                    resourceTypeLsit: d
                });
            } else {
                d = state.resourceTypeLsit;
            }
            return d;
        } catch (e) {
            throw e;
        }
    },
    async getMemberInfo({
        commit,
        state
    }, isForce = false) {
        try {
            let d;
            if (isForce || !state.memberinfo.id) {
                let res = await GetCurrentPartyMemberInfo();
                if (res) {
                    d = res;
                } else {
                    d = new PartyMember();
                }
                commit('UPDATESTATE', {
                    memberinfo: d
                });
            } else {
                d = state.memberinfo;
            }
            return d;
        } catch (e) {
            throw e;
        }
    },
    async getAccountInfo({
        commit,
        state
    }, isForce = false) {
        try {
            let account = Cookies.get(`${PREFIX}user`);
            if (isForce || !account) {
                account = await GetAccountInfo({
                    Id: state.session.userId
                });
                Cookies.set(`${PREFIX}user`, JSON.stringify(account));
            } else {
                account = JSON.parse(account);
            }
            commit('UPDATESTATE', {
                user: account
            });
            return account;
        } catch (e) {
            throw e;
        }
    },
    async systemTypeSelect({
        commit,
        dispatch
    }, payload) {
        try {
            let roles = payload.roleIds.split(',');
            let roleIndex = roles.findIndex(e => e.toString() == 9);
            if (roleIndex > -1 && roles.length > 1) {
                commit('UPDATESTATE', {
                    systemType: 'adminAndUser'
                });
                localStorage.setItem(`${PREFIX}systemType`, "adminAndUser");
            } else if (roleIndex == -1) {
                commit('UPDATESTATE', {
                    systemType: 'admin',
                });
                localStorage.setItem(`${PREFIX}systemType`, "admin");
            } else {
                commit('UPDATESTATE', {
                    systemType: 'user'
                });
                localStorage.setItem(`${PREFIX}systemType`, "user");
            }
        } catch (e) {
            throw e
        }
    },
    async userLogin({
        commit,
        dispatch
    }, payload) {
        try {
            let res = await Sigin(payload);
            localStorage.setItem(`${PREFIX}session`, JSON.stringify(res));
            commit('UPDATESTATE', {
                session: res
            });
            axios.setOption('Authorization', `Bearer ${res.accessToken}`);
            await dispatch('getAllBaseCodes');
            // await dispatch('systemTypeSelect', res);
            // RouteInit();
            return res;
        } catch (e) {
            throw e;
        }
    },
    async uploadAuth({
        commit,
        state
    }, payload) {
        try {
            let res = await UserChangeRole(payload);
            let obj = Object.assign(state.session, res)
            localStorage.setItem(`${PREFIX}session`, JSON.stringify(obj));
            commit('UPDATESTATE', {
                session: obj
            });
            axios.setOption('Authorization', `Bearer ${obj.accessToken}`);
            // RouteInit();
            return obj;
        } catch (e) {
            throw e;
        }
    },
    async wxBind({
        commit,
        dispatch
    }, payload) {
        try {
            let res = await SiginAndBindWeChat(payload);
            localStorage.setItem(`${PREFIX}session`, JSON.stringify(res));
            commit('UPDATESTATE', {
                session: res
            });
            axios.setOption('Authorization', `Bearer ${res.accessToken}`);
            await dispatch('getAllBaseCodes');
            await dispatch('systemTypeSelect', res);
            // RouteInit();
            return res;
        } catch (e) {
            throw e;
        }
    },
    async userLoginByToken({
        commit,
        dispatch
    }, payload) {
        try {
            let res = await WeChatOpenAuthByToken({ token: payload });
            localStorage.setItem(`${PREFIX}session`, JSON.stringify(res));
            commit('UPDATESTATE', {
                session: res
            });
            axios.setOption('Authorization', `Bearer ${res.accessToken}`);
            await dispatch('getAllBaseCodes');
            await dispatch('systemTypeSelect', res);
            // RouteInit();
            return res;
        } catch (e) {
            throw e;
        }
    },
    async loginOut({
        commit
    }, payload) {
        try {
            // Cookies.remove(`${PREFIX}session`);
            // Cookies.remove(`${PREFIX}user`);
            localStorage.removeItem(`${PREFIX}menu`);
            localStorage.removeItem(`${PREFIX}base_code`);
            localStorage.removeItem(`${PREFIX}permissions`);
            localStorage.removeItem(`${PREFIX}session`);
            localStorage.removeItem(`${PREFIX}systemType`);
            localStorage.removeItem(`${PREFIX}all_permiss`);
            axios.setOption('Authorization', ``);
            commit('UPDATESTATE', {
                session: {},
                user: {},
                menu: [],
                baseCode: {},
                permissions: [],
                systemType: []
            })
            return true;
        } catch (e) {
            throw e;
        }
    },
    async getAllBaseCodes({
        commit
    }, isForce = false) {
        try {
            let code = localStorage.getItem(`${PREFIX}base_code`);
            if (isForce || !code) {
                code = await GetAllBaseCodes();
                code = JSON.stringify(code);
                localStorage.setItem(`${PREFIX}base_code`, code);
            }
            code = JSON.parse(code);
            commit('UPDATESTATE', {
                baseCode: code
            });
            return code;
        } catch (e) {
            throw e;
        }
    },
    async getAllRoles({
        commit,
        state
    }, isForce = false) {
        try {
            let d;
            if (isForce || !state.allPermissions.length) {
                d = await GetAllRole();
                commit('UPDATESTATE', {
                    allroles: d
                });
            } else {
                d = state.allroles;
            }
            return d;
        } catch (e) {
            throw e;
        }
    },
    async getAllPermiss({ commit }, payload, isForce = false) {
        console.log(payload)
        try {
            let code = localStorage.getItem(`${PREFIX}all_permiss`);
            if (isForce || !code) {
                code = await GetMenuList(payload);
                // code = await GetPermission();
                code = JSON.stringify(code);
                // localStorage.setItem(`${PREFIX}all_permiss`, code);
            }
            code = JSON.parse(code);
            commit('UPDATESTATE', {
                allPermiss: code
            });
            return code;
        } catch (e) {
            throw e;
        }
    },

    //获取未读消息
    async getNotice({
        commit
    }) {
        try {
            let res = await GetUnreadAnnouncemenCount();
            commit('UPDATESTATE', {
                notice: res
            });
            return res;
        } catch (e) {
            throw e;
        }
    },
}