import Cadastro from './components/Cadastro.vue';
import Login from './components/Login.vue';

export const routes = [
    { path: '/', component: Login},
    { path: '/cadastro', component: Cadastro},
];