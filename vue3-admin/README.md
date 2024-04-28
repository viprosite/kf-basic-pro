# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.


## 记录点
1. 在vue实例上挂载全局数据并访问
```javascript
import api from './api/api.js'
const app = createApp(App)
app.config.globalProperties.$api = api

import { getCurrentInstance } from "vue";
let { proxy } = getCurrentInstance();
proxy.$api.xxx
```

2. 组件用ref访问dom节点 注意ref属性名
```javascript
<div class="chart-box" ref="chart"></div>

import { getCurrentInstance } from "vue";
let { proxy } = getCurrentInstance();
echarts.init(proxy.$refs.chart)
```

3. 顶部页面tag思路：
首页tag一直存在不能删除
点击左侧菜单栏时tag没有就新增否则替换tag背景色为活动色
删除tag时，如果是最后一个，路由调整为它前面一个并且背景活动色；如果不是最后一个路由调整为它后面那个变为活动色
注意tag无论路由如何变都是存在的，所以tag放在Main.vue中


4. 样式穿透写法  :deep(sel){}
```javascript
.el-breadcrumb {
    :deep(span) {
    color: #fff;
    }
}
```

5. mock用法
```javascript
a. api.js集合所有api
b. mock.js匹配请求路径并指定方法：
Mock.mock('/mock/api/home/getData', homeApi.getHomeData)
c. 指定的方法模拟响应：
export default {
    getHomeData: () => {
        return {
            code: 200,
            data: {
                tableData: []
            }
        }
    }
}
```

6. 权限管理  结合动态路由 思路：（两种方式：前端维护路由 + 后端返回路由）
用户登录的角色不同，返回的左侧操作菜单不一样，存储到vuex中

**后端返回路由方式：**
```javascript
a. 路由格式：{
    path: "/user",
    name: "user",
    label: "用户管理",
    icon: "user",
    url: "user/User",         // 前端根据此路径创建vue页面文件，对应到 views/user/User.vue
},
b. router/index.js: 只挂载常量路由
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Main.vue'),
        redirect: '/home',
        children: []
    },
    {
        path: '/login',
        component: () => import('../views/Login.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
c. 登录后或刷新页面后addRoute
refreshMenus(state, router) {
    // state.menus是给Aside组件使用的； menuArr是动态挂载路由
    if (!localStorage.getItem('menus')) return
    let menus = JSON.parse(localStorage.getItem('menus'))
    state.menus = menus
    let menuArr = []
    formatMenu(menus, menuArr)
    menuArr.forEach(item => {
        router.addRoute('home', item)
    })
},
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
```
**前端维护路由方式：**
```javascript
c.前端维护完整路由表，分为常量路由表和动态路由表；
创建router实例时只挂载常量路由表；动态路由表添加meta数据：如 meta:{ role:['admin'] }表示该路由页面可以被哪些角色访问；
a.login接口拿到token
b.userInfo拿到role和用户信息；根据role信息从动态路由表中过滤可以访问的页面addRoute动态挂载

```



7. 路由守卫：
``` javascript
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
```