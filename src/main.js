import Vue from 'vue'
import App from './App.vue'
import Axios from "axios";
import VueRouter from "vue-router";
import ElementUI from 'element-ui';

Vue.prototype.axios = Axios

Vue.use(VueRouter)
Vue.use(ElementUI,{
  size: 'small'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

