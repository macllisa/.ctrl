import Cadastro from './components/Cadastro.vue';
import Login from './components/Login.vue';
import Dashboard from './components/Dashboard.vue'
import Pedidos from './components/Pedidos/ListaPedidos.vue'
import NovoPedido from './components/Pedidos/NovoPedido.vue'
import Estoque from './components/Estoque/ListaEstoque.vue'
import Clientes from './components/Clientes/ListaClientes.vue'
import Vendas from './components/Vendas/ListaVendas.vue'
import NovaVenda from './components/Vendas/NovaVenda.vue'

export const routes = [
    { path: '*', redirect: '/login' },
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login},
    { path: '/cadastro', component: Cadastro},
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } ,
        children: [
        { path: '/pedidos', component: Pedidos},
        { path: '/novoPedido', component: NovoPedido},
        { path: '/estoque', component: Estoque},
        { path: '/clientes', component: Clientes},
        { path: '/vendas', component: Vendas},
        { path: '/novaVenda', component: NovaVenda}
        ]
    },
];