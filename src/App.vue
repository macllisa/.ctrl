<template>
    <v-app>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
import { routes } from './routes';

export default {
    data(){
        return{
            routes
        }
    }
}
</script>

<style scoped>

</style>

