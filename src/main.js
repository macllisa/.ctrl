import Vue from 'vue'
import App from './App.vue'
import './firebase';
import vuetify from './plugins/vuetify';
import { routes } from './routes';
import VueRouter from 'vue-router';
import firebase from 'firebase';
import { firestorePlugin } from 'vuefire'

Vue.config.productionTip = false
Vue.use(vuetify)
Vue.use(firestorePlugin);

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

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log(currentUser + " " + requiresAuth)/* eslint-disable-line no-console */

  if (requiresAuth && !currentUser) next('/login');
  else if (!requiresAuth && currentUser) next('/dashboard');
  else next();
})








