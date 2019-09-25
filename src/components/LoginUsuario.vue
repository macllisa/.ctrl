<template>
<div class="space">
    <header>
        <img src="../assets/images/logo.png">
    </header>
    <v-form ref="form" id="formLogin" class="formLogin">
        <div class="loginInput">
            <label><b>EMAIL:</b></label>
            <input id="emailLogin" type="text" name="user" v-model="email" required :rules='validacaoEmail'>
        </div>
        <div class="loginInput">
            <label><b>SENHA:</b></label>
            <input id="senha" type="password" name="senha" v-model="senha" required :rules='validacaoSenha'>
        </div>
        <label><router-link to="/cadastro">Cadastre-se</router-link></label> 
        <v-btn class="button title font-weight-bold" @click="realizarLogin()">Login</v-btn>    
    </v-form>
</div>
</template>

<script>
import firebase from 'firebase'
import { usersCollection } from "../firebase.js"
import { routes } from '../routes';

export default {
  name: 'loginUsuario',
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

header{
    width: 100%;
    height: 200px;
    align-items: center;
    justify-items: center;
    display: flex;
}

header img{
    margin: 0 auto;
    width: 170px;
    height: auto; 
}

.formLogin{
    margin: 0;
    color: #f4eded;
    font-family: 'Quicksand', sans-serif;
}

.formLogin .button{
    background-color: #f4eded;
    color: #ef7b45;
    font-size: 14px;
    border: none;
    text-align: center; 
    width: 50px;
    height: 25px;
    border-radius: 5px;
    float: right;
    margin-bottom: 30px;
    cursor: pointer;
}

.formLogin .button:hover{
    background-color:#ef7b45 !important;
    color: #f4eded;
    cursor: pointer;
}

.formLogin label a{
    color: #f4eded;
    text-decoration: none;
    font-size: 14px;
}

.loginInput{
    margin: 0 auto;
    width: auto;
    align-items: center;
    justify-items: center;
    display: flex;
    padding: 15px;
    border-radius: 10px;
    background-color: #f4eded;
    color: #ef7b45;
    margin-bottom: 15px;
}

input{
    outline: none;
    padding-left: 10px;
    width: 100%;
    -webkit-text-fill-color: #0e2323;
}

input:visited{
    background-color: #f4eded;
}

@media (max-width: 576px) {
    /* header img{
        background-color: orange;
    } */
    header{
        margin: 30px 0;
    }
    .formLogin{
        margin: 0 10%;
    }
}

@media (min-width: 577px) {
    /* header img{
        background-color: pink;
    } */
    header{
        margin: 35px 0;
    }
    .formLogin{
        margin: 0 15%;
    }
}

@media (min-width: 768px) {
    /* header img{
        background-color: red;
    } */
    header{
        margin: 30px 0;
    }
    .formLogin{
        margin: 0 20%;
    }
}

@media (min-width: 992px) {
    /* header img{
        background-color: yellow;
    } */
    header{
        margin: 30px 0;
    }
    .formLogin{
        margin: 0 25%;
    }
}

@media (min-width: 1366px) {
    /* header img{
        background-color: green;
    } */
    header{
        margin: 30px 0;
    }
    .formLogin{
        margin: 0 30%;
    }
 }

@media (min-width: 1920px) {
    /* header img{
        background-color: blue;
    } */
    header{
        margin: 50px 0;
    }
    .formLogin{
        margin: 0 30%;
    }
}
</style>
