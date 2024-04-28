import { createApp } from 'vue'
import './assets/less/index.less'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './permission.js'
import './api/mock.js'
import api from './api/api.js'
const app = createApp(App)
// .use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$api = api
// console.log(app);
store.commit("refreshMenus", router);
app.use(store)
app.use(router)
app.mount('#app')

