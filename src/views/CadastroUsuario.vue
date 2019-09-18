<template>
  <div class="cadastroUsuario">
    <input type="email" v-model="email" placeholder="Email"> <br>
    <input type="password" v-model="senha" placeholder="Senha"> <br>
    <button @click.prevent="cadastrarUsuario()">Cadastrar</button>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'

export default {
  name: 'cadastroUsuario',
  data() {
    return {
      email: '',
      senha: ''
    }
  },
  methods: {
	cadastrarUsuario() {
		firebase.auth().createUserWithEmailAndPassword(this.email, this.senha).then(
			(user) => {
				console.log("Usuário cadastrado com sucesso: ", user); /* eslint-disable-line no-console */
				// TODO alert avisando o usuário
			},
			(error) => {
				console.log("Error ao cadastrar o usuário: ", error); /* eslint-disable-line no-console */
				// TODO alert avisando o usuário
			}
		)
    }
  }
}
</script>
