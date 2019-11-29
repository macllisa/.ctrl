<template>
<div class="dashboard">
    <v-app-bar dark color="#0a0a0a" class="px-2 hidden-lg-and-up">
        <v-app-bar-nav-icon @click=" drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title class="pl-0">
            <v-img src="../assets/images/logo.png" width="70px"/>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon color="#0a0a0a"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app class="nav" color="#0a0a0a">
      <v-list-item dark class="pl-10 mt-8">
        <v-list-item-content>
          <v-list-item-title class="title mb-6">
            <router-link to="/pedidos"><v-img src="../assets/images/logo.png" width="140px"/></router-link>
          </v-list-item-title>
          <v-list-item-subtitle>
            Olá, {{ username }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav dark class="px-7 pt-6 py-4">
        <v-list-item v-for="item in items" :key="item.title" router :to="item.link">
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="realizarLogout()">
            <v-list-item-icon>
                <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Sair</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <router-view></router-view>
</div>    
</template>

<script>
import firebase from 'firebase';
import { routes } from '../routes';
import { usersCollection } from '../firebase.js';

export default {
    data(){
        return{
            drawer: true,
            routes,
            username: '',
            items: [
                // { title: 'Dashboard', icon: 'mdi-view-dashboard-outline', link: '/dashboard'},
                { title: 'Pedidos', icon: 'mdi-clipboard-list-outline', link: '/pedidos'},
                { title: 'Estoque', icon: 'mdi-archive', link: '/estoque'},
                { title: 'Clientes', icon: 'mdi-account-multiple-outline', link: '/clientes'},
                { title: 'Vendas', icon: 'mdi-cash-multiple', link: '/vendas'}
            ],
        }
    },

    created(){
        this.getNome()
    },

    methods: {
        realizarLogout() {
            firebase.auth().signOut().then(
            () => {
                console.log('Logout realizado com sucesso'); /* eslint-disable-line no-console */
                this.$router.replace('/');
            }),
            () => {
                console.log('Erro ao realizar o logout!'); /* eslint-disable-line no-console */
            };
        },

        getNome(){
            let currentUser = firebase.auth().currentUser.uid;
            usersCollection.get().then((snapshot) =>{
                snapshot.docs.forEach(doc =>{
                    if(doc.id === currentUser){
                        this.username = doc.data().nome
                    } 
                })
            })
        }
    }
}
</script>

<style scoped>
.title{
    margin-left: -9px;
}

.nav{
    height: 100%;
}
</style>