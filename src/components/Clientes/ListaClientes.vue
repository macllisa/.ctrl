<template>
  <v-card flat class="white ma-4">
    <v-data-table
      flat
      :headers="headers"
      :items="arrayClientes"
      hide-default-footer
      class="pt-4 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="subtitle-1 font-weight-bold ml-1 py-2">CLIENTES</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn
                small
                color="primary"
                dark
                depressed
                class="px-2 mb-2"
                v-on="on"
              >Adicionar Cliente</v-btn>
            </template>
            <v-card class="pa-4">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.Nome" color="primary" label="Nome"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.Telefone" color="primary" label="Telefone"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.Email" color="primary" label="Email"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field v-model="editedItem.Endereco" color="primary" label="Endereço"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.Aniversario"
                        color="primary"
                        label="Aniversário"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="grey darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="primary" text @click="save">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2" @click="editItem(item)">mdi-pencil-outline</v-icon>
        <v-icon @click="deleteItem(item)">mdi-delete-forever</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import firebase from "firebase";
import { clientesCollection } from "../../firebase.js";

export default {
  data() {
    return {
      clientes: [],
      headers: [
        { text: "Nome", align: "left", value: "Nome" },
        { text: "Telefone", value: "Telefone" },
        { text: "Email", value: "Email" },
        { text: "Endereço", value: "Endereco" },
        { text: "Aniversário", value: "Aniversario" },
        { text: "Ações", value: "action", sortable: false, align: "right" }
      ],
      dialog: false,
      arrayClientes: [],
      editedIndex: -1,
      editedItem: {
        Nome: '',
        Telefone: '',
        Email: '',
        Endereco: '',
        Aniversario: ''
      },
      editedItemIdentifier: "",
      defaultItem: {
        Nome: '',
        Telefone: '',
        Email: '',
        Endereco: '',
        Aniversario: ''
      }
    };
  },

  created() {
    this.getClientes();
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Cliente" : "Editar Cliente";
    },
  },

  methods: {
    formatEmail(email) {
      return email.substring(0, email.indexOf("@"))
    }, 

    generateGUID() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    },

    getClientes() {
      let currentUser = firebase.auth().currentUser.uid;
      clientesCollection.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (doc.id === currentUser) {
            this.clientes = doc.data();
            this.arrayClientes = Object.values(this.clientes);
            console.log(this.array)
          }
        });
      });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      let createdAt = new Date();
      let currentUser = firebase.auth().currentUser.uid;
      let userId = this.generateGUID();
      if (!this.editedItemIdentifier) {
        clientesCollection.doc(currentUser).set({
          [userId]: {
            Nome: this.editedItem.Nome,
            Telefone: this.editedItem.Telefone,
            Email: this.editedItem.Email,
            Aniversario: this.editedItem.Aniversario,
            Endereco: this.editedItem.Endereco,
            Id: userId
          }
          },{ merge: true})
          .then(() => {
            alert('Cliente cadastrado com sucesso!'); 
          },
          (error)=> {
            alert('Erro ao cadastrar cliente!');
            console.log('Erro: ' + error); /* eslint-disable-line no-console */
          });
      } else {
        clientesCollection.doc(currentUser).set({
          [this.editedItemIdentifier]: {
            Nome: this.editedItem.Nome,
            Telefone: this.editedItem.Telefone,
            Email: this.editedItem.Email,
            Aniversario: this.editedItem.Aniversario,
            Endereco: this.editedItem.Endereco,
            Id: this.editedItemIdentifier
          }
          },{ merge: true})
          .then(() => {
            alert('Cliente cadastrado com sucesso!'); 
          },
          (error)=> {
            alert('Erro ao cadastrar cliente!');
            console.log('Erro: ' + error); /* eslint-disable-line no-console */
          });
      }
      this.close();
      this.getClientes();
      this.editedItemIdentifier = "";
    },

    editItem(item) {
      this.editedIndex = this.arrayClientes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItemIdentifier = this.editedItem.Id;
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.arrayClientes.indexOf(item);
      confirm("Tem certeza que deseja excluir esse cliente?") &&
        this.deletarCliente(item);
    },

    deletarCliente(item) {
      let currentUser = firebase.auth().currentUser.uid;
      clientesCollection.doc(currentUser).update(
        {
          [item.Id]: firebase.firestore.FieldValue.delete()
        }
      )
      .then(() => {
        console.log("Cliente deletado com sucesso")
      })
      .catch((error) => {
        console.log("Erro ao deletar cliente", error)
      })
    }
  }
};
</script>
