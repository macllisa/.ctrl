<template>
  <div class="cadastroUsuario">
    <v-form ref="form">
        <v-text-field v-model="email" :rules="validacaoEmail" label="Email" required></v-text-field>
        <v-text-field v-model="senha" :rules="validacaoSenha" label="Senha" required></v-text-field>
        <v-btn @click="cadastrarUsuario()">Cadastrar</v-btn>
    </v-form>
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
        senha: '',
        validacaoEmail: [
            v => !!v || 'E-mail é obrigatório',
            v => /.+@.+/.test(v) || 'E-mail inválido',
        ],
        validacaoSenha: [
            v => v.length >= 6 || 'A senha precisa ter no mínimo 6 caracteres'
        ]
    }
  },
  methods: {
    validarFormularioCadastro() {
        return this.$refs.form.validate()
    },
	cadastrarUsuario() {
        if (this.validarFormularioCadastro()) {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.senha).then(
                (user) => {
                    console.log("Usuário cadastrado com sucesso: ", user); /* eslint-disable-line no-console */
                    // TODO alert avisando o usuário que foi cadastrado com sucesso
                },
                (error) => {
                    console.log("Error ao cadastrar o usuário: ", error); /* eslint-disable-line no-console */
                    // TODO alert avisando o usuário que ocorreu algum erro
                }
            )
        } else {
            console.log("Formulário inválido "); /* eslint-disable-line no-console */
            // TODO alert avisando o usuario que o form esta errado
        }
    }
  }
}
</script>
