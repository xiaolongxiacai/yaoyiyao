import Vue from 'vue'
import app from './cardApp'
import {LoadingPlugin, WechatPlugin, ToastPlugin} from 'vux'
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(ToastPlugin)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  mounted: () => {
  },
  template: '<app/>',
  components: {
    app
  }
})

