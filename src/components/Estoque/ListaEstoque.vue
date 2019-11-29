<template>
  <v-card elevation="1" class="white listaPedidos ma-4">
    <v-row class="px-4 pt-4">
      <v-card-title class="subtitle-1 font-weight-bold">ESTOQUE:</v-card-title>
    </v-row>
    <v-dialog v-model="dialogProducts" max-width="900px">
      <v-card class="pa-4">
        <v-card-title>
         <span>Entradas do Produto</span><span class="primary--text pl-2">{{produtoId}}</span>
         <v-spacer></v-spacer>
           <v-btn icon small fab @click="dialogProducts = !dialogProducts"><v-icon small>mdi-close</v-icon></v-btn>
         <v-data-table class="py-4 dataTable" no-data-text="Não existem produtos cadastrados." :headers="headersEsteProduto" :items="esteProduto"></v-data-table>
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
import { estoqueCollection, produtosCollection } from '../../firebase.js';

export default {
  data () {
    return {
      dialogProducts: false,
      estoque: [],
      produtosEx: [],
      todosProdutos: [],
      esteProduto: [],
      produtoId : "",
      search: "",
      headers: [
        { text: 'Código', value: 'codigo', align: 'left'},
        { text: 'Quantidade', value: 'qtdeProduto' },
        { text: "Detalhes", value: "action", align: 'right', sortable: false }
      ],
      headersEsteProduto: [
        { text: 'Preço', value: 'Preco' },
        { text: 'Quantidade', value: 'Quantidade' },
        { text: 'Pedido de Origem', value: 'Pedido' },
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
      this.getAllInput(id.codigo)
    },

    getAllInput(produto){
      let currentUser = firebase.auth().currentUser.uid;
      produtosCollection.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (doc.id === currentUser) {
            this.todosProdutos = doc.data();
            this.convertProducts(this.todosProdutos, produto)
          }
        });
      });
    },

    convertProducts(produtos, produto){
      this.todosProdutos = []
      Object.values(produtos).forEach(prod => {
           this.todosProdutos.push(prod)
      })
      this.showAllInput(this.todosProdutos, produto)
    },

    showAllInput(todos, produto){
      this.esteProduto = []
      for(let prod of todos){
        if(prod.CodProduto === produto){
          this.esteProduto.push(prod)
        }
      }
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

.dataTable{
  width: 100%;
}
</style>