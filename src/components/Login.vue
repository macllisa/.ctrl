<template>
    <v-container fluid>
        <v-row align="center">
            <v-col>
                <v-form class="form ma-auto" ref="form">
                    <v-img src="../assets/images/logo.png" width='170px' class="my-12 mx-auto"/>
                    <v-form class="pt-6">
                        <v-text-field 
                            id="emailLogin" 
                            type="text" 
                            name="email" 
                            v-model="email" 
                            required 
                            :rules='validacaoEmail' 
                            dark 
                            outlined 
                            color="#ef7b45" 
                            label="Email"/>
                        <v-text-field 
                            id="senha" 
                            type="password" 
                            name="senha" 
                            v-model="senha" 
                            required 
                            :rules='validacaoSenha' 
                            dark 
                            outlined 
                            color="#ef7b45" 
                            label="Senha"/>
                    </v-form>
                    <v-row class="px-3">
                        <router-link class="font-weight-light body-2" to="/cadastro">Cadastre-se</router-link>
                        <v-btn @click="realizarLogin()" small outlined color="#ef7b45" class="ml-auto">
                            <span>Login</span>
                        </v-btn>
                    </v-row>
                </v-form>    
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import firebase from 'firebase'
import { usersCollection } from "../firebase.js"
import { routes } from '../routes';

export default {
  name: 'Login',
  data() {
    return {
        email: '',
        senha: '',
        routes,
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
    validarFormularioLogin() {
        return this.$refs.form.validate()
    },
    loginComEmailESenha(email, senha) {
        firebase.auth().signInWithEmailAndPassword(email, senha).then(
            () => {
                console.log("Logado com sucesso "); /* eslint-disable-line no-console */
                // TODO ROUTER REPLACE
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

<style scoped>
.container{
    height: 100%;
    background-color: #220a36;
}

.form{
    width: 60%;
}

a{  
    text-decoration: none;
    color: white !important;
}

a:hover{
    color: #ef7b45 !important;
}

@media (max-width: 575px) {
    .form{
         width: 80%;
    }
}

@media (min-width: 576px) {
    .form{
         width: 80%;
    }
}

@media (min-width: 768px) {
    .form{
        width: 60%;
    }
}

@media (min-width: 992px) {
    .form{
        width: 50%;
    }
}

@media (min-width: 1200px) {
    .form{
        width: 50%;
    }
}

@media (min-width: 1280px) {
    .form{
        width: 40%;
    }
}

@media (min-width: 1920px) {
    .form{
        width: 40%;
    }
}
</style>