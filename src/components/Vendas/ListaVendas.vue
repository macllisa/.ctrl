<template>
  <v-card elevation="1" class="white ma-4">
    <v-row class="pa-4">
      <v-card-title class="subtitle-1 font-weight-bold">VENDAS:</v-card-title>
      <v-spacer></v-spacer>
      <v-card-actions class="pr-3">
        <v-btn small depressed dark color="primary" router to="/novaVenda">Nova Venda</v-btn>
      </v-card-actions>
    </v-row>

    <!-- <v-dialog v-model="dialogProducts" max-width="900px">
      <v-card class="pa-4">
        <v-card-title>
         <span>Vendas:</span> <v-spacer></v-spacer><span class="primary--text pl-2">{{produtoId}}</span>
        </v-card-title>
          <v-data-table class="px-4" hide-default-footer :headers="headersProdutos" :items="produtosEx" :items-per-page="rows"></v-data-table>
      </v-card>
    </v-dialog> -->

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
import { vendasCollection } from "../../firebase.js";

export default {
  data() {
    return {
      rows: 100,
      vendas: [],
      search: "",
      headers: [
        { text: "Data", value: "dataVenda" },
        { text: "Valor", value: "valorVenda" },
        { text: "Cliente", value: "clienteVenda" },
        { text: "Status", value: "statusVenda" },
        { text: "Detalhes", value: "action", sortable: false, align: 'right' }
      ],
    };
  },

  created() {
    this.getDocumentVendas();
  },

  methods: {
    getDocumentVendas() {
      var currentUser = firebase.auth().currentUser.uid;
      vendasCollection.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (doc.id === currentUser) {
            let result = doc.data();
            console.log(result)
            // // Attr = key
            // for (let key in result) {
            //   let pedido = {
            //     id: key
            //   };

            //   for (let attr in result[key]) {
            //     pedido[attr] = result[key][attr];
            //   }
            //   this.pedidos.push(pedido);
            // }
          }
        });
      });
    },

    // open(id){
    //   this.produtosEx = []
    //   this.dialogProducts = true
    //   Object.values(this.produtos).forEach(produto => {
    //     if (produto.Pedido == id.id) {
    //       this.produtosEx.push(produto)
    //       this.produtoId = id.id
    //     }   
    //   })
    // },
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
