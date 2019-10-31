<template>
  <v-container fluid>
    <v-row align="center">
      <v-col>
        <v-card color="#0a0a0a" class="px-8 pt-1 pb-12 form mx-auto">
          <v-form ref="form">
            <router-link to="/">
              <v-btn text icon dark class="mt-6 mb-0">
                <v-icon small>mdi-arrow-left</v-icon>
              </v-btn>
            </router-link>
            <v-img src="../assets/images/logo.png" width="170px" class="mb-5 mt-0 mx-auto" />
            <v-form>
              <v-text-field
                id="nome"
                type="text"
                name="nome"
                v-model="nome"
                required
                dark
                color="primary"
                label="Nome"
              />
              <v-text-field
                id="cpf"
                type="text"
                name="cpf"
                v-model="cpf"
                required
                dark
                color="primary"
                label="CPF"
              />
              <v-select
                id="empresa"
                name="empresa"
                v-model="empresa"
                required
                dark
                color="primary"
                label="Selecione a empresa"
                :items="empresas"
              ></v-select>
              <v-text-field
                id="email"
                type="text"
                name="email"
                v-model="email"
                required
                dark
                color="primary"
                label="Email"
                :rules="validacaoEmail"
              />
              <v-text-field
                id="senha"
                type="password"
                name="senha"
                v-model="senha"
                required
                dark
                color="primary"
                item-color="primary"
                label="Senha"
                :rules="validacaoSenha"
              />
            </v-form>
            <v-row class="px-3">
              <v-btn
                @click="cadastrarUsuario()"
                small
                outlined
                color="primary"
                class="ml-auto mt-5"
              >
                <span>Concluir Cadastro</span>
              </v-btn>
            </v-row>
            <br />
            <v-alert
              :value="alertError"
              color="red"
              dark
              border="top"
              icon="mdi-alert"
              transition="scale-transition"
            >{{ errorMessage }}</v-alert>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import { usersCollection } from "../firebase.js";
import { routes } from "../routes";

export default {
  name: "cadastroUsuario",
  data() {
    return {
      alertError: false,
      errorMessage: "",
      nome: "",
      cpf: "",
      email: "",
      senha: "",
      empresa: "",
      routes,
      validacaoEmail: [
        v => !!v || "E-mail é obrigatório",
        v => /.+@.+/.test(v) || "E-mail inválido"
      ],
      validacaoSenha: [
        v => v.length >= 6 || "A senha precisa ter no mínimo 6 caracteres"
      ],
      empresas: ["Natura"]
    };
  },
  methods: {
    showErrorAlert(message) {
      this.alertError = true;
      this.errorMessage = message;
    },
    hideErrorAlert() {
      this.alertError = false;
    },
    validarFormularioCadastro() {
      return this.$refs.form.validate();
    },
    cadastrarUsuarioFirestore(idUsuario) {
      if (idUsuario != null && idUsuario != "") {
        usersCollection
          .doc(idUsuario)
          .set({
            nome: this.nome,
            email: this.email,
            cpf: this.cpf,
            empresa: this.empresa,
            createdAt: new Date(),
            updatedAt: new Date()
          })
          .then(function() {
            console.log(
              "Usuário cadastrado no Firestore com sucesso! "
            ); /* eslint-disable-line no-console */
            alert("Usuário cadastrado com sucesso!");
            this.$router.replace("/login");
          })
          .catch(function(error) {
            console.log(
              "Erro ao cadastrar usuário no Firestore: ",
              error
            ); /* eslint-disable-line no-console */
            this.showErrorAlert(
              "Ocorreu um erro ao cadastrar usuário. Por favor, tente novamente."
            );
          });
      } else {
        console.log(
          "ID do usuario indefinido ou nulo"
        ); /* eslint-disable-line no-console */
        alert("Erro ao obter Id do usuário!");
      }
    },
    cadastrarUsuarioComEmailESenha(email, senha) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, senha)
        .then(
          user => {
            console.log(
              "Usuário cadastrado com sucesso: ",
              user
            ); /* eslint-disable-line no-console */
            this.cadastrarUsuarioFirestore(user.user.uid);
            // TODO alert avisando o usuário que foi cadastrado com sucesso
          },
          error => {
            this.showErrorAlert(
              "Erro ao cadastrar o usuário. Por favor, tente novamente."
            );
          }
        );
    },
    cadastrarUsuario() {
      if (this.validarFormularioCadastro()) {
        this.hideErrorAlert();
        this.cadastrarUsuarioComEmailESenha(this.email, this.senha);
      } else {
        this.showErrorAlert(
          "Formulário inválido. Por favor, o preencha corretamente."
        );
      }
    }
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  background-image: url("../assets/images/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.form {
  width: 60%;
}

a {
  text-decoration: none;
}

a:hover {
  color: primary !important;
}

@media (max-width: 575px) {
  .form {
    width: 95%;
    margin-top: 0%;
  }
}

@media (min-width: 576px) {
  .form {
    width: 85%;
    margin-top: 0%;
  }
}

@media (min-width: 768px) {
  .form {
    width: 60%;
    margin-top: 2%;
  }
}

@media (min-width: 992px) {
  .form {
    width: 50%;
    margin-top: 2%;
  }
}

@media (min-width: 1200px) {
  .form {
    width: 50%;
    margin-top: 2%;
  }
}

@media (min-width: 1280px) {
  .form {
    width: 40%;
    margin-top: 2%;
  }
}

@media (min-width: 1920px) {
  .form {
    width: 40%;
    margin-top: 5%;
  }
}
</style>