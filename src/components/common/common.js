
import Vue from 'vue'
import {
	GetLableByValue,
	FormatDate
} from '@/utils/util'
const common = {
    install(Vue,options){
        Vue.prototype.$fn = {
            setLocalStorage(key, value) { //设置localStorage
				localStorage.setItem(key, value)
			},
			getLocalStorage(key) { //获取localStorage
				if (localStorage.getItem(key)) {
					return localStorage.getItem(key)
				} else {
					return null
				}

			},
			clearLocalStorage(key) { //清除localStorage
				localStorage.removeItem(key)
			},
        };
        Vue.prototype.FormatDate = FormatDate;
        /**
         *
         * @param {value} 码表值
         * @param {type} 码表键
         */
        Vue.prototype.GetCodeTableValue = function(value, type) {
        	let str = '';
        	if (value !== '') {
        		value += '';
        		let e = this.$store.state.baseCode;
        		let d = e ? e : {};
        		str = GetLableByValue(value, d[type] ? d[type] : []);
        	}
        	return str;
        }
    }
}

export default common
