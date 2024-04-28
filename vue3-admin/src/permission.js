import router from './router'
import store from './store'
router.beforeEach((to, from, next) => {
    store.commit('getToken')
    let token = store.state.token
    console.log(token);
    //如果没有token且不是到login页面，则跳转到login页面
    if (!token && to.name != 'login') {
        next({ name: 'login' })
    } else if (!checkRouter(to.path)) {
        // 如果想到不存在的页面，则跳转到home页面
        next({ path: '/' })
    } else {
        next()
    }
})

function checkRouter(path) {
    let hasCheck = router.getRoutes().filter(route => route.path == path).length
    if (hasCheck) {
        return true
    } else {
        return false
    }
}