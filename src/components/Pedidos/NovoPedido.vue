<template>
  <v-card elevation="1" class="white listaPedidos ma-4">
    <v-card-title class="subtitle-1 font-weight-bold ml-1 pt-6 py-2">NOVO PEDIDO</v-card-title>
    <v-row class="mx-3 mt-3">
      <v-text-field
        class="px-1"
        id="codigoPedido"
        type="text"
        name="codigoPedido"
        v-model="codigoPedido"
        required
        outlined
        color="primary"
        label="Código Pedido"
      />
      <v-text-field
        class="px-1"
        id="dataPedidoido"
        type="text"
        name="dataPedido"
        v-model="dataPedido"
        required
        outlined
        color="primary"
        label="Data Emissão"
      />
      <v-text-field
        class="px-1"
        id="dataRecebimentoPedido"
        type="text"
        name="dataRecebimentoPedido"
        v-model="dataRecebimentoPedido"
        required
        outlined
        color="primary"
        label="Data Chegada"
      />
    </v-row>

    <v-data-table :headers="headers" :items="products" hide-default-footer class="elevation-2 mx-4">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="subtitle-2">Produtos</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn small color="primary" dark depressed class="px-2 mb-2" v-on="on">Adicionar Produto</v-btn>
            </template>
            <v-card class="pa-4">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.codigoProduto" color="primary" label="Código"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.qtdeProduto"
                        color="primary"
                        label="Quantidade"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.precoProduto" color="primary" label="Preço"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field v-model="editedItem.descricaoProduto" color="primary" label="Descrição"></v-text-field>
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
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small color="primary" dark class="mx-2 mb-3 mt-5" @click="salvarPedido()">Finalizar pedido</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from 'firebase';
import { pedidosCollection } from '../../firebase.js';
import { produtosCollection } from '../../firebase.js';

export default {
  data: () => ({
    codigoPedido: "",
    dataPedido: "",
    dataRecebimentoPedido: "",
    headers: [
      {
        text: "Código",
        align: "left",
        value: "codigoProduto"
      },
      { text: "Descrição", value: "descricaoProduto" },
      { text: "Quantidade", value: "qtdeProduto" },
      { text: "Preço unitário", value: "precoProduto" },
      { text: 'Ações', value: 'action', sortable: false }
    ],
    products: [],
    editedIndex: -1,
    editedItem: {
      codigoProduto: "",
      descricaoProduto: "",
      qtdeProduto: "",
      precoProduto: ""
    },
    defaultItem: {
      codigoProduto: "",
      descricaoProduto: "",
      qtdeProduto: "",
      precoProduto: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Produto" : "Editar Produto";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {  
    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.products.indexOf(item);
      confirm("Tem certeza que deseja excluir esse produto?") &&
        this.products.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.products[this.editedIndex], this.editedItem);
      } else {
        this.products.push(this.editedItem);
      }
      this.close();
    },

    salvarProdutos() {
      var userLogado = firebase.auth().currentUser.uid;
      this.products.forEach(produto => {
        var codigoProduto = produto.codigoProduto;
        var codigoSet = codigoProduto + this.codigoPedido
         produtosCollection.doc(userLogado).set({
          [codigoSet]:{
          CodProduto: produto.codigoProduto,
          Pedido: this.codigoPedido,
          Descricao: produto.descricaoProduto,
          Quantidade: produto.qtdeProduto,
          Preco : produto.precoProduto
          }
        },{ merge:true })
      });
    },

    salvarPedido(){
      var currentUser = firebase.auth().currentUser.uid;
      var codPedido = this.codigoPedido;
      pedidosCollection.doc(currentUser).set({
          [codPedido]:{ 
          DataEmissao: this.dataPedido,
          DataRecebimento: this.dataRecebimentoPedido
          }
      },{ merge: true})
      .then(() => {
        this.salvarProdutos()
        alert('Pedido cadastrado com sucesso!');
        console.log('Pedido cadastrado com sucesso.')
      },
      (error)=> {
        alert('Erro ao cadastrar pedido! Ver log para mais informacoes');
        console.log('Erro: ' + error);
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