<template>
    <v-app class="background">
        <v-content>
            <transition  name="fade">
                <router-view></router-view>
            </transition>
        </v-content>
    </v-app>
</template>

<script>
import { routes } from './routes';

export default {
    name:'App',
    data() {
        return {
            routes
        }
    }
}
</script>

<style scoped>
.background{
    background-color: #ececed !important;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}

</style>

