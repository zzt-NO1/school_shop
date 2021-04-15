import Vue from 'vue'
import App from './App.vue'
import Axios from "axios";
import VueRouter from "vue-router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer';
import 'vue-directive-image-previewer/dist/assets/style.css'
import moment from 'moment'

Vue.prototype.$moment = moment

Vue.prototype.axios = Axios

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueDirectiveImagePreviewer)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

