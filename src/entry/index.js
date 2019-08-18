// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'current-script-polyfill'
import Vue from 'vue'
import App from '@/entry/App.vue'
import router from '../router'
import store from '../vuex/store'
import axios, {
    CallBack
} from '@/api/axios'
import '@/utils/iview'
import '@/utils/extend'
import globalComponent from '@/components/global'
// import common from '@/components/common/common'
import * as custom from '@/filter/filter'
// import './style/reset.less'
import '@/style/base.less'
import '@/style/common.less'
//error img
import ZwVideo from '@/assets/images/default-video.png'
import ZwSchool from '@/assets/images/default-school.png'
import ZwVideoCourse from '@/assets/images/default-video-course.png'
import ZwExam from '@/assets/images/default-exam.png'
import ZwOrganization from '@/assets//images/default-organization.png'
import ZwSite from '@/assets/images/default-site.png'
import ZwAvatar from '@/assets/images/avatar.png'
Vue.use(globalComponent)
//axios 401回调
CallBack.unauthorized = () => {
    store.dispatch('loginOut').then(res => {
        router.push('/login')
    });
}

// Vue.use(common)

Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})

/*
 * 重写Date的toJSON方法，消除JSON.stringify引起的时间减少8小时
 */
Date.prototype.toJSON = function() {
    let format = (fmt) => {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    return format("yyyy-MM-dd hh:mm:ss");
}

//图片加载失败指令
Vue.directive('imgerror', {
    inserted: function(el, binding) {
        el.onerror = () => {
            if (binding.modifiers.school) {
                el.src = ZwSchool;
            } else if (binding.modifiers.avatar) {
                el.src = ZwAvatar;
            } else if (binding.modifiers.site) {
                el.src = ZwSite;
            } else if (binding.modifiers.video) {
                el.src = ZwVideo;
            } else if (binding.modifiers.videoCourse) {
                el.src = ZwVideoCourse;
            } else if (binding.modifiers.org) {
                el.src = ZwOrganization;
            } else if (binding.modifiers.exam) {
                el.src = ZwExam;
            } else {
                el.src = ZwVideo;
            }
            el.onerror = '';
        }
    }
})

Vue.config.productionTip = false
let render = async function() {
        try {
            let session = localStorage.getItem(`${PREFIX}session`);
            if (session) {
                session = JSON.parse(session);
                store.commit('UPDATESTATE', {
                    session
                });

                axios.setOption('Authorization', `Bearer ${store.state.session.accessToken}`);
                //根据缓存判断身份进入
                let systemType = localStorage.getItem(`${PREFIX}systemType`);
                if (systemType == 'user') {
                    await store.dispatch('getCurrentUserPermissionNames', { isadmin: false });
                    store.commit('UPDATESTATE', {
                        systemType: 'user'
                    });
                } else {
                    await store.dispatch('getCurrentUserPermissionNames', {});
                    store.commit('UPDATESTATE', {
                        systemType: 'admin'
                    });
                }
                await store.dispatch('getAllBaseCodes');
                // RouteInit();
                return true;
            }
        } catch (e) {
            throw e;
        }
    }
    /* eslint-disable no-new */
render().then(() => {
    new Vue({
        el: '#app',
        router,
        store,
        components: {
            App
        },
        template: '<App/>'
    })
})