import Vue from 'vue'
import App from './App.vue'
import './firebase';
import vuetify from './plugins/vuetify';
import { routes } from './routes';
import VueRouter from 'vue-router';
import firebase from 'firebase';

Vue.config.productionTip = false
Vue.use(vuetify)

Vue.use(VueRouter)

let app = '';

const router = new VueRouter({ 
  routes, 
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('/login');
  else if (!requiresAuth && currentUser) next('/dashboard');
  else next();
})

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
      app = new Vue({
          router,
          vuetify,
          render: h => h(App)
      }).$mount('#app');
  }
});






