import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
Vue.use(Vuex)

const state = {
	session: {},
	user: {},
	systemType: null,
	permissions: [],
	baseCode: {},
	allPermiss: [],
	allPermissions: [],
	resourceTypeLsit: [],
	memberinfo: {},
	allroles: [],
	notice: 0
}

export default new Vuex.Store({
	state,
	actions,
	mutations
})
