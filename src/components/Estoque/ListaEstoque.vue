<template>
  <v-card elevation="1" class="white listaPedidos ma-4">
    <v-row class="pa-4">
      <v-card-title class="subtitle-1 font-weight-bold">Estoque:</v-card-title>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="name"
      show-expand
      class="elevation-1 pa-3"
    >
      <template v-slot:expanded-item="{ headers }">
        <td :colspan="headers.length">Todas as entradas desse produto</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import firebase from 'firebase';
import { estoqueCollection } from '../../firebase.js';

export default {
  data () {
    return {
      expanded: [],
      estoque: [],
      singleExpand: true,
      headers: [
        { text: 'Código', value: 'codProduto', align: 'left'},
        { text: 'Quantidade', value: 'qtde' } 
      ],
      estoque: [],
    }
  },

  methods: {
    lerEstoque(){
      estoqueCollection.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (doc.id === currentUser) {
            this.estoque = doc.data();
          }
        });
      });
    }
  },
}
    
</script>