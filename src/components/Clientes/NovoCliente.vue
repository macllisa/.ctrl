<template>
  <v-card elevation="1" class="white ma-4">
    <v-card-title class="subtitle-1 font-weight-bold ml-1 pt-6 py-2">NOVO CLIENTE</v-card-title>
    <v-row class="mx-3 mt-3">
      <v-text-field
        class="px-1"
        id="nomeCliente"
        type="text"
        name="nomeCliente"
        v-model="nomeCliente"
        outlined
        color="primary"
        label="Nome"
      />
      <v-text-field
        class="px-1"
        id="telefoneCliente"
        type="text"
        name="telefoneCliente"
        v-model="telefoneCliente"
        outlined
        color="primary"
        label="Telefone"
      />
      <v-text-field
        class="px-1"
        id="emailCliente"
        type="text"
        name="emailCliente"
        v-model="emailCliente"
        outlined
        color="primary"
        label="Email"
      />
      <v-text-field
        class="px-1"
        id="dataAniversarioCliente"
        type="text"
        name="dataAniversarioCliente"
        v-model="dataAniversarioCliente"
        outlined
        color="primary"
        label="Data Aniversário"
      />
      <v-text-field
        class="px-1"
        id="endereçoCliente"
        type="text"
        name="endereçoCliente"
        v-model="enderecoCliente"
        outlined
        color="primary"
        label="Endereço"
      />
    </v-row>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        small
        color="primary"
        dark
        class="mx-2 mb-3"
        @click="adicionarCliente()"
      >Adicionar Cliente</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from 'firebase';
import { clientesCollection } from '../../firebase.js';


export default {
    data(){
        return {
            nomeCliente: '',
            telefoneCliente: '',
            emailCliente: '',
            dataAniversarioCliente: '',
            enderecoCliente: '',
        }
    },

    methods: {
        adicionarCliente(){
            let createdAt = new Date();
            let currentUser = firebase.auth().currentUser.uid;
            clientesCollection.doc(currentUser).set({
            [createdAt]:{ 
            Nome: this.nomeCliente,
            Telefone: this.telefoneCliente,
            Email: this.emailCliente,
            Aniversario: this.dataAniversarioCliente,
            Endereco: this.enderecoCliente
            }
            },{ merge: true})
            .then(() => {
                alert('Cliente cadastrado com sucesso!');
            },
            (error)=> {
                alert('Erro ao cadastrar cliente!');
                console.log('Erro: ' + error); /* eslint-disable-line no-console */
            })
        }
    }
}

</script>

<style scoped>
a {
  text-decoration: none;
}

a:hover {
  color: primary !important;
}
</style>