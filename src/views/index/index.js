import Vue from 'vue'
import app from './index.vue'
// import router from '../router/index'
import {LoadingPlugin, WechatPlugin, ToastPlugin, AjaxPlugin} from 'vux'
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(ToastPlugin)
Vue.use(AjaxPlugin)
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  // router,
  mounted: () => {
  },
  template: '<app/>',
  components: {
    app
  }
})

