import btnGreen from './btnGreen/index.vue'


function plugins(Vue) {
  Vue.component("btnGreen", btnGreen);

}

// 全局注册的组件在微信小程序里面不兼容  
// 请自导入

export default plugins;