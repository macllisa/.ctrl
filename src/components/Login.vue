<template>
  <v-container fluid>
    <v-row align="center">
      <v-col>
        <v-card color="#0a0a0a" class="px-8 pt-1 pb-12 form mx-auto">
          <v-form ref="form">
            <v-img src="../assets/images/logo.png" width="170px" class="my-12 mx-auto" />
            <v-form class="pt-6">
              <v-text-field
                id="emailLogin"
                type="text"
                name="email"
                v-model="email"
                required
                :rules="validacaoEmail"
                dark
                outlined
                color="primary"
                label="Email"
              />
              <v-text-field
                id="senha"
                type="password"
                name="senha"
                v-model="senha"
                required
                :rules="validacaoSenha"
                dark
                outlined
                color="primary"
                label="Senha"
              />
            </v-form>
            <v-row class="px-3">
              <router-link class="font-weight-light body-2" to="/cadastro">Cadastre-se</router-link>
              <v-btn
                @click="realizarLogin()"
                :loading="logando"
                small
                outlined
                color="primary"
                class="ml-auto"
              >
                <span>Login</span>
              </v-btn>
            </v-row>
          </v-form>
          <br />
          <v-alert
            :value="alertError"
            color="pink"
            dark
            border="top"
            icon="mdi-alert"
            transition="scale-transition"
          >
            {{ errorMessage }}
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import { routes } from "../routes";

export default {
  name: "Login",
  data() {
    return {
      logando: false,
      email: "",
      senha: "",
      alertError: false,
      errorMessage: "",
      routes,
      validacaoEmail: [
        v => !!v || "E-mail é obrigatório",
        v => /.+@.+/.test(v) || "E-mail inválido"
      ],
      validacaoSenha: [
        v => v.length >= 6 || "A senha precisa ter no mínimo 6 caracteres"
      ]
    };
  },
  methods: {
    showErrorAlert(message) {
      this.alertError = true;
      this.errorMessage = message;
    },
    hideErrorAlert() {},
    validarFormularioLogin() {
      return this.$refs.form.validate();
    },
    loginComEmailESenha(email, senha) {
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, senha)
        .then(
          () => {
            console.log(
              "Logado com sucesso "
            ); /* eslint-disable-line no-console */
            this.$router.replace("/dashboard");
          },
          () => {
            this.showErrorAlert(
              "Ocorreu um erro ao logar. Por favor, tente novamente."
            );
          }
        );
    },
    realizarLogin() {
      if (this.validarFormularioLogin()) {
        this.logando = true;
        this.alertError = false;
        this.loginComEmailESenha(this.email, this.senha).then(() => {
          this.logando = false;
        });
      } else {
        this.showErrorAlert("Por favor, preencha o formulário corretamente.");
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
  color: white !important;
}

a:hover {
  color: primary !important;
}

@media (max-width: 575px) {
  .form {
    width: 95%;
    margin-top: 7%;
  }
}

@media (min-width: 576px) {
  .form {
    width: 85%;
    margin-top: 5%;
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