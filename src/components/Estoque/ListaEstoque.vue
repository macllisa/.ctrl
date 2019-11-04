<template>
  <v-card elevation="1" class="white listaPedidos ma-4">
    <v-row class="px-4 pt-4">
      <v-card-title class="subtitle-1 font-weight-bold">ESTOQUE:</v-card-title>
    </v-row>
    <v-dialog v-model="dialogProducts" max-width="900px">
      <v-card class="pa-4">
        <v-card-title>
         <span>Entradas do Produto</span><span class="primary--text pl-2">{{produtoId}}</span>
        </v-card-title>     
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
        <v-data-table :headers="headers" :items="produtosEx" :search="search">
            <template v-slot:item.action="{ item }">
              <v-icon @click="open(item)">mdi-content-paste</v-icon>
            </template>
        </v-data-table>
      </v-card>
    </template>
  </v-card>
</template>

<script>
import firebase from 'firebase';
import { estoqueCollection } from '../../firebase.js';

export default {
  data () {
    return {
      dialogProducts: false,
      estoque: [],
      produtosEx: [],
      produtoId : "",
      search: "",
      headers: [
        { text: 'Código', value: 'codigo', align: 'left'},
        { text: 'Quantidade', value: 'qtdeProduto' },
        { text: "Detalhes", value: "action", align: 'right', sortable: false }
      ]
    }
  },

  created(){
    this.lerEstoque();
  },

  methods: {
    lerEstoque(){
      
      let currentUser = firebase.auth().currentUser.uid;
      estoqueCollection.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (doc.id === currentUser) {
            this.estoque = doc.data();
            this.convert(this.estoque)
          }
        });
      });
    },

    convert(estoque){
      this.produtosEx = []
      Object.values(estoque).forEach(est => {
           this.produtosEx.push(est)
      })
    },

    open(id){
      this.dialogProducts = true
      this.produtoId = id.codigo
    }
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
</style>