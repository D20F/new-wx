import Vue from 'vue'
import App from './App'
import store from './store'

//导入uview 组件
import uView from "uview-ui";
Vue.use(uView);

// 全局注册组件 小程序无效
import component_plugins from './component/plugins'
Vue.use(component_plugins);

// 注册拦截器
import './utils/interceptor'


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App,
    store,
})
app.$mount()