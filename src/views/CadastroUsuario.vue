<template>
  <div class="cadastroUsuario">
    <v-form ref="form">
        <v-text-field outlined v-model="email" type="email" :rules="validacaoEmail" label="Email" required></v-text-field>
        <v-text-field outlined v-model="senha" type="password" :rules="validacaoSenha" label="Senha" required></v-text-field>
        <v-btn @click="realizarLogin()">Login</v-btn>
        <v-btn @click="cadastrarUsuario()">Cadastrar</v-btn>
    </v-form>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
import { usersCollection } from "../firebase.js"

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
    cadastrarUsuarioFirestore() {
        usersCollection.add({
            email: this.email,
            createdAt: new Date(),
            updatedAt: new Date()
        }) // .doc(ID DO CARA LOGADO)
        .then(function(docRef) {
            console.log("Usuário cadastrado no Firestore com sucesso. ID: ", docRef.id); /* eslint-disable-line no-console */
        })
        .catch(function(error) {
            console.log("Erro ao cadastrar usuário no Firestore: ", error); /* eslint-disable-line no-console */
        })
    },
    cadastrarUsuarioComEmailESenha(email, senha) {
        firebase.auth().createUserWithEmailAndPassword(email, senha).then(
            (user) => {
                console.log("Usuário cadastrado com sucesso: ", user); /* eslint-disable-line no-console */
                // TODO alert avisando o usuário que foi cadastrado com sucesso
            },
            (error) => {
                console.log("Error ao cadastrar o usuário: ", error); /* eslint-disable-line no-console */
                // TODO alert avisando o usuário que ocorreu algum erro
            }
        )
        this.cadastrarUsuarioFirestore()
    },
	cadastrarUsuario() {
        if (this.validarFormularioCadastro()) {
            this.cadastrarUsuarioComEmailESenha(this.email, this.senha)
        } else {
            console.log("Formulário inválido "); /* eslint-disable-line no-console */
            // TODO alert avisando o usuario que o form esta errado
        }
    },
    validarFormularioLogin() {
        return this.$refs.form.validate()
    },
    loginComEmailESenha(email, senha) {
        firebase.auth().signInWithEmailAndPassword(email, senha).then(
            () => {
                console.log("Logado com sucesso "); /* eslint-disable-line no-console */
                // TODO ROUTER REPLACE
                this.$router.replace('about')
            },
            () => {
                console.log("Erro ao logar"); /* eslint-disable-line no-console */
            }
        )
    },
    realizarLogin() {
        if (this.validarFormularioLogin()) {
            this.loginComEmailESenha(this.email, this.senha)
        } else {
            console.log("Formulário inválido "); /* eslint-disable-line no-console */
            // TODO alert avisando o usuario que o form esta errado
        }
    }
  }
}
</script>
