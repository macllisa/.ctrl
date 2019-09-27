<template>
    <v-app class="background">
        <v-content> 
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
import { routes } from './routes';

export default {
    name:'App',
    data(){
        return{
            routes
        }
    }
}
</script>

<style scoped>
.background{
    background-color:#220a36 !important;
}

</style>

