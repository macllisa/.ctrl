<template>
    <nav>
        <v-toolbar flat app class="red">
             <v-app-bar-nav-icon class="orange--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
        </v-toolbar>
        <v-navigation-drawer v-model='drawer' app>
            <v-img src="../assets/images/logo.png" width="100px"/>
        </v-navigation-drawer>
    </nav>
</template>
<script>
export default {
    data(){
        return{
            drawer: false
        }
    }
}
</script>

<style scoped>
a{  
    text-decoration: none;
    color: white !important;
}

a:hover{
    color: #ef7b45 !important;
}
</style>