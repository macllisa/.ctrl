import Cadastro from './components/Cadastro.vue';
import Login from './components/Login.vue';
import Dashboard from './components/Dashboard.vue'

export const routes = [
    { path: '/', component: Login},
    { path: '/cadastro', component: Cadastro},
    { path: '/dashboard', component: Dashboard},
];