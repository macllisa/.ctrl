<template>
  <v-card elevation="1" class="white ma-4">
    <v-row class="pa-4">
      <v-card-title class="subtitle-1 font-weight-bold">VENDAS:</v-card-title>
      <v-spacer></v-spacer>
      <v-card-actions class="pr-3">
        <v-btn small depressed dark color="primary" router to="/novaVenda">Nova Venda</v-btn>
      </v-card-actions>
    </v-row>

    <v-dialog v-model="dialogVendas" max-width="900px">
      <v-card class="pa-4">
        <v-card-title>
         <span>Produtos da Venda:</span> <v-spacer></v-spacer><span class="primary--text pl-2"></span>
        </v-card-title>
          <v-data-table class="px-4" hide-default-footer :headers="headersProdutos" :items="produtosEx" :items-per-page="rows"></v-data-table>
      </v-card>
    </v-dialog>

    <template>
      <v-card flat class="mx-4">
          <v-text-field
            class="filtrar"
            v-model="search"
            append-icon="mdi-magnify"
            label="Filtrar"
            single-line
            hide-details
          ></v-text-field>
        <v-data-table :headers="headers" :items="vendas" :search="search">
            <template v-slot:item.action="{ item }">
              <v-icon @click="open(item)">mdi-content-paste</v-icon>
            </template>
        </v-data-table>
      </v-card>
    </template>
  </v-card>
</template>

<script>
import firebase from "firebase";
import { vendasCollection, saidaCollection } from "../../firebase.js";

export default {
  data() {
    return {
      rows: 100,
      vendas: [],
      dialogVendas: false,
      search: "",
      headers: [
        { text: "Data", value: "Data" },
        { text: "Valor", value: "Valor" },
        { text: "Cliente", value: "NomeCliente" },
        { text: "Número de Parcelas", value: "Parcelas" },
        { text: "Detalhes", value: "action", sortable: false, align: 'right' }
      ],
      produtos: [],
      headersProdutos: [
        { text: "Código", value: "CodProduto" },
        { text: "Preço", value: "Preco" },
        { text: "Quantidade", value: "Quantidade" }
      ],
      produtosEx: [],
      vendaCod: ""
    };
  },

  created() {
    this.getDocumentVendas();
    this.getDocumentProdutos();
  },

  methods: {
    getDocumentVendas() {
      var currentUser = firebase.auth().currentUser.uid;
      vendasCollection.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (doc.id === currentUser) {
            let result = doc.data();
            console.log(result)
            // Attr = key
            for (let key in result) {
              let venda = {};
              for (let attr in result[key]) {
                venda[attr] = result[key][attr];
              }
              this.vendas.push(venda);
            }
          }
        });
      });
      console.log(this.vendas)
    },

    getDocumentProdutos() {
      var currentUser = firebase.auth().currentUser.uid;
      saidaCollection.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (doc.id === currentUser) {
            this.produtos = doc.data();
          }
        });
      });
    },

    open(id){
      console.log(id)
      console.log(this.produtos)
      this.produtosEx = []
      this.dialogVendas = true
      Object.values(this.produtos).forEach(produto => {
        if (produto.Venda == id.Cod) {
          this.produtosEx.push(produto)
          this.vendaCod = id.Cod
        }   
      })
    },
  }
}
</script>

<style scoped>
.filtrar{
    width: 150px;
    margin-left: auto;
    margin-right: 0;
    padding-right: 10px;
}

.header {
  width: 50px;
}
</style>
