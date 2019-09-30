<template>
    <div class="dashboard">
        <Navbar/>
        <router-view></router-view>
    </div>
</template>


<script>
import Navbar from './Navbar.vue'

export default {
    components: { Navbar },
    data(){
        return{

        }
    }
}
</script>