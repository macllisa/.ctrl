<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <CadastroUsuario />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import CadastroUsuario from './CadastroUsuario.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    CadastroUsuario
  }
}
</script>
