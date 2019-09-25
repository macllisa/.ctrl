<template>
    <v-app class="grey darken-4">
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

</style>

