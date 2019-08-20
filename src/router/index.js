import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
import { LoadingBar, Message } from 'iview'
import { isEmptyObject, hasAuthority } from '@/utils/util'
import BasicRoutes from './admin/basic'
import KeyWorkRoutes from './admin/keyWork'
import OrganinzationRoutes from './admin/organization'
import partybuildRoutes from './admin/partybuild'
import SettingRoutes from './admin/settings'
Vue.use(Router)

const router = new Router({
    mode: ROUTER_TYPE,
    base: BASE_ROUTE,
    // savePosition会记录当前页面的滚动位置，可以通过返回值滚动到相应位置
    scrollBehavior: (to, from, savePosition) => {
        // 如果savePosition存在，则直接滚动到相应位置
        if (savePosition) {
            return savePosition
        }
        // 否则直接回到顶部
        return { x: 0, y: 0 }
    },
    routes: [{
            path: '/',
            redirect: () => { //重定向到第一个权限菜单
                return '/login'
                // if (store.state.permissions.length && store.state.permissions[0].url) {
                //     return store.state.permissions[0].url
                // }
            },
            component: () =>
                import ('@/pages/home/home'), //导航
            children: [{
                    path: 'main',
                    name: 'main',
                    component: () =>
                        import ('@/pages/main'), //导航
                },

                ...BasicRoutes,
                ...KeyWorkRoutes,
                ...OrganinzationRoutes,
                ...partybuildRoutes,
                ...SettingRoutes
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('@/pages/login/login-wrap'), //登录页面
            children: [{
                    path: '/',
                    name: 'login-redirect',
                    redirect: 'pwd',
                },

                {
                    path: 'pwd',
                    name: 'login-pwd',
                    component: () =>
                        import ('@/pages/login/login-pwd') //登录页面
                },
            ]
        },
        {
            path: '/loginfaceselect',
            component: () =>
                import ('@/pages/common/FaceSelect'),
            name: 'loginfaceselect'
        },
        {
            path: '/retrievepassword',
            component: () =>
                import ('@/pages/common/RetrievePassword'),
            name: 'retrievepassword'
        },
        {
            path: '/403',
            name: '403',
            component: () =>
                import ('@/pages/404/403.vue')
        },
        {
            path: '/404',
            name: '404',
            component: () =>
                import ('@/pages/404/404.vue')
        },
        {
            path: '*',
            component: () =>
                import ('@/pages/404/404.vue')
        }

    ]
})
router.beforeEach(async(to, from, next) => {
    next()
        // if (to.name == 'login-pwd' && isEmptyObject(store.state.session)) {
        //     next()
        // } else if (to.name !== 'login-pwd' && !hasAuthority(to.path, store.state.permissions)) {
        //     if (from.name == 'login-pwd') {
        //         Message.warning('您没有权限!请与管理员联系');
        //         await store.dispatch('loginOut');
        //     }
        //     if (from.path == "/" || from.path == "") {
        //         if (store.state.permissions.length) {
        //             if (store.state.permissions[0].children.length) {
        //                 next(store.state.permissions[0].children[0].url)
        //             } else {
        //                 next(store.state.permissions[0].url)
        //             }
        //         } else {
        //             next('/login/login-pwd');
        //         }
        //     } else {
        //         Message.warning('您没有权限!请与管理员联系');
        //         next(from.path)
        //     }
        // } else {
        //     LoadingBar.start();
        //     next();
        // }

})
router.afterEach(() => {
    let oLodingDom = document.getElementById('loader-wrapper');
    if (oLodingDom) {
        document.querySelector('body').removeChild(oLodingDom);
    }
    LoadingBar.finish();
});
export default router