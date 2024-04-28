import { createStore } from "vuex";
import Cookie from 'js-cookie'

export default createStore({
    state: {
        isCollapse: false,
        currentMenu: null,
        tabsList: [
            // {
            //     path: '/',
            //     name: 'home',
            //     label: '首页',
            //     icon: 'home'
            // }
        ],
        menus: [],
        token: ''
    },
    mutations: {
        updateIsCollapse(state, payload) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            state.currentMenu = val.name == 'home' ? null : val
            if (!state.tabsList.some(item => item.name == val.name)) {
                state.tabsList.push(val)
            }
        },
        removeTag(state, val) {
            console.log(val);
            state.tabsList.splice(state.tabsList.findIndex(item => item.name == val.name), 1)
        },
        updateMenus(state, val) {
            state.menus = val
            localStorage.setItem('menus', JSON.stringify(val))
        },
        refreshMenus(state, router) {
            if (!localStorage.getItem('menus')) return
            let menus = JSON.parse(localStorage.getItem('menus'))
            state.menus = menus
            // state.menus是给Aside组件使用的； menuArr是动态挂载路由
            let menuArr = []
            formatMenu(menus, menuArr)
            menuArr.forEach(item => {
                router.addRoute('home', item)
            })
        },
        setToken(state, token) {
            state.token = token
            Cookie.set('token', token)
            console.log(Cookie.get('token'));
        },
        clearToken(state) {
            state.token = ''
            Cookie.remove('token')
        },
        getToken(state) {
            state.token = state.token || Cookie.get('token')
        },
        logout(state) {
            state.menus = []
            localStorage.removeItem('menus')
            state.token = ''
            Cookie.remove('token')
        }
    }
})

function formatMenu(menus, menuArr) {
    menus.forEach(item => {
        if (item.children) {
            formatMenu(item.children, menuArr)
        } else {
            let url = `../views/${item.url}.vue`
            item.component = () => import(url)
            menuArr.push(item)
        }
    })
}