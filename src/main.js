import Vue from 'vue'
import App from './App.vue'
import './firebase';
import vuetify from './plugins/vuetify';
import { routes } from './routes';
import VueRouter from 'vue-router';


Vue.config.productionTip = false
Vue.use(vuetify)
Vue.use(VueRouter)

const router = new VueRouter({ 
  routes, 
  mode: 'history'
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')









