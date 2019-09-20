<template>
<div class="space">
    <header>
        <img src="../assets/images/logo.png">
    </header>
    <form id="formCadastro" class="formCadastro">
        <div class="titulo"><label>CADASTRO:</label></div>
        <div class="cadastroInput">
            <label><b>NOME:</b></label>
            <input id="nomeCadastro" type="text" name="nome">
        </div>
        <div class="cadastroInput">
            <label><b>CPF:</b></label>
            <input id="cpfCadastro" type="number" name="nome">
        </div>
        <div class="cadastroInput">
            <label><b>EMAIL:</b></label>
            <input id="emailCadastro" type="text" name="user" required :rules='validacaoEmail'>
        </div>
        <div class="cadastroInput">
            <label><b>SENHA:</b></label>
            <input id="senha" type="password" name="senha" required :rules='validacaoSenha'>
        </div>
        <div class="cadastroInput">
            <label><b>CONFIRMAR SENHA:</b></label>
            <input id="senha" type="password" name="senha" required :rules='validacaoSenha'>
        </div>
        <label><router-link to="/">Fazer login</router-link></label> 
        <button type="submit"><b>OK</b></button>    
    </form>
</div>

</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
import { usersCollection } from "../firebase.js"
import { routes } from '../routes';

export default {
  name: 'cadastroUsuario',
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
    validarFormularioCadastro() {
        return this.$refs.form.validate()
    },
    cadastrarUsuarioFirestore(idUsuario) {
        if (idUsuario != null && idUsuario != "") {
            usersCollection.doc(idUsuario).set({
                email: this.email,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .then(function() {
                console.log("Usuário cadastrado no Firestore com sucesso! "); /* eslint-disable-line no-console */
            })
            .catch(function(error) {
                console.log("Erro ao cadastrar usuário no Firestore: ", error); /* eslint-disable-line no-console */
            })
        } else {
            console.log("ID do usuario indefinido ou nulo") /* eslint-disable-line no-console */
        }
    },
    cadastrarUsuarioComEmailESenha(email, senha) {
        firebase.auth().createUserWithEmailAndPassword(email, senha).then(
            (user) => {
                console.log("Usuário cadastrado com sucesso: ", user); /* eslint-disable-line no-console */
                this.cadastrarUsuarioFirestore(user.user.uid)
                // TODO alert avisando o usuário que foi cadastrado com sucesso
            },
            (error) => {
                console.log("Error ao cadastrar o usuário: ", error); /* eslint-disable-line no-console */
                // TODO alert avisando o usuário que ocorreu algum erro
            }
        )
    },
	cadastrarUsuario() {
        if (this.validarFormularioCadastro()) {
            this.cadastrarUsuarioComEmailESenha(this.email, this.senha)
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
    height: 140px;
    align-items: center;
    justify-items: center;
    display: flex;
}

header img{
    margin: 0 auto;
    width: 170px;
    height: auto; 
}

.titulo{
    padding-bottom: 10px;
    font-size: 15px;
    color: #f4eded;
    font-family: 'Quicksand', sans-serif;
}

.formCadastro{
    margin: 0;
    color: #f4eded;
    font-family: 'Quicksand', sans-serif;
}

.formCadastro button{
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

.formCadastro button:hover{
    background-color: #ef7b45;
    color: #f4eded;
}

.formCadastro label a{
    color: #f4eded;
    text-decoration: none;
    font-size: 14px;
}

.formCadastro label a:hover{
    color: #ef7b45;
}

.cadastroInput{
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
        height: 120px;
    }
    .formCadastro{
        margin: 0 10%;
    }
}

@media (min-width: 577px) {
    /* header img{
        background-color: pink;
    } */
    header{
        margin: 35px 0;
        height: 130px;
    }
    .formCadastro{
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
    .formCadastro{
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
    .formCadastro{
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
    .formCadastro{
        margin: 0 30%;
    }
 }

@media (min-width: 1920px) {
    /* header img{
        background-color: blue;
    } */
    header{
        margin: 50px 0;
        height: 200px;
    }
    .formCadastro{
        margin: 0 30%;
    }
}
</style>
