import {
	GetLableByValue
} from '@/utils/util'
import store from '@/vuex/store'
const CodeTable = (value, type) => {
	let str = '';
	if (value !== '') {
		value += '';
		let e = store.state.baseCode;
		let d = e ? e : {};
		str = GetLableByValue(value, d[type] ? d[type] : []);
	}
	return str;
}

const limit = (value, len = 0) => {
	let s = value ? value.toString() : '';
	if (s.length > len) {
		return s.substr(0, len) + "...";
	}
	return s;
}

const DateFormat = (value, reg = 'yyyy-MM-dd') => {
	if (value) {
		let d = new Date(value.replace(/\-/g, '/').replace('T', ' ').replace(/\.[\d]*$/, ''));
		return d.Format(reg);
	}
	return '';
}

const FormatSeconds = (value) => {
	var theTime = parseInt(value);// 秒
	var theTime1 = 0;// 分
	var theTime2 = 0;// 小时
	if (theTime > 60) {
		theTime1 = parseInt(theTime / 60);
		theTime = parseInt(theTime % 60);
		if (theTime1 > 60) {
			theTime2 = parseInt(theTime1 / 60);
			theTime1 = parseInt(theTime1 % 60);
		}
	}

	var result = "" + parseInt(theTime);//秒
	if (10 > theTime > 0) {
		result = "0" + parseInt(theTime);//秒
	} else {
		result = "" + parseInt(theTime);//秒
	}

	if (10 > theTime1 > 0) {
		result = "0" + parseInt(theTime1) + ":" + result;//分，不足两位数，首位补充0，
	} else {
		result = "" + parseInt(theTime1) + ":" + result;//分
	}
	if (theTime2 > 0) {
		result = "" + parseInt(theTime2) + ":" + result;//时
	}
	return result;
}
export {
	CodeTable,
	limit,
	DateFormat,
	FormatSeconds
}
