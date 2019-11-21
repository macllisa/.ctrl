<template>
  <v-card elevation="1" class="white ma-4">
    <v-card-title class="subtitle-1 font-weight-bold ml-1 pt-6 py-2">NOVA VENDA</v-card-title>
    <v-row class="mx-3 mt-3">
      <v-autocomplete
        class="px-1"
        id="clienteVenda"
        type="text"
        name="clienteVenda"
        v-model="clienteVenda"
        required
        outlined
        color="primary"
        label="Cliente"
        :items="clientes"
      />
      <v-dialog
        ref="dialog"
        class="px-1"
        width="290px"
        v-model="modalData"
        :return-value.sync="dataVenda"
      >
        <template v-slot:activator="{ on }">
          <v-text-field v-model="getDataVenda" label="Data Realização" outlined readonly v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="dataVenda" locale="pt-BR" :max="dataAtual">
          <v-spacer></v-spacer>
          <v-btn text color="grey darken-1" @click="modal = false">Cancelar</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(dataVenda)">Ok</v-btn>
        </v-date-picker>
      </v-dialog>
    </v-row>

    <v-data-table :headers="headers" :items="products" hide-default-footer class="elevation-2 mx-4">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="subtitle-2">Produtos</v-toolbar-title>
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
              >Adicionar Produto</v-btn>
            </template>
            <v-card class="pa-4">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.codigoProduto"
                        color="primary"
                        label="Código"
                      ></v-text-field>
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

    <v-row class="mx-3 mt-5">
      <v-text-field
        class="px-1 "
        id="numParcelas"
        type="number"
        name="numParcelas"
        v-model="numParcelas"
        hide-details
        required
        outlined
        color="primary"
        label="Número de Parcelas"
        @change="calcValores()"
      />

      <v-spacer></v-spacer>      
      
      <span class="pa-3 primary--text font-weight-bold">VALOR PARCELA:<span class="grey--text pl-2">{{ valParcela }}</span></span>
      
      <span class="pa-3 primary--text font-weight-bold">TOTAL:<span class="grey--text pl-2">{{ valVenda }}</span></span>
    </v-row>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        small
        color="primary"
        dark
        class="mx-2 mb-3 mt-5"
        @click="salvarVenda()"
      >Finalizar venda</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "firebase";
import {
  vendasCollection,
  estoqueCollection,
  saidaCollection,
  clientesCollection, 
  produtosCollection
} from "../../firebase.js";

export default {
  data: () => ({
    modalData: false,
    dialog: false,
    dataVenda: "",
    clienteVenda: "",
    codigoVenda: "",
    valVenda: 0,
    valParcela: 0,
    numParcelas: 1,
    dataAtual: new Date().toISOString().slice(0, 10),
    headers: [
      {
        text: "Código",
        align: "left",
        value: "codigoProduto"
      },
      { text: "Quantidade", value: "qtdeProduto" },
      { text: "Preço unitário", value: "precoProduto" },
      { text: "Ações", value: "action", sortable: false }
    ],
    products: [],
    editedIndex: -1,
    editedItem: {
      codigoProduto: "",
      qtdeProduto: "",
      precoProduto: ""
    },
    defaultItem: {
      codigoProduto: "",
      qtdeProduto: "",
      precoProduto: ""
    },
    estoqueProduto: "",
    arrayClientes: [],
    codigosClientes: [],
    nomesClientes: [],
    clientes: []
  }),
  mounted() {
    this.getClientes();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Produto" : "Editar Produto";
    },
    getDataVenda() {
      return this.formatDate(this.dataVenda);
    },
    getDataRecebimentoPedido() {
      return this.formatDate(this.dataRecebimentoPedido);
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
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
            let clientes = Object.values(doc.data())
            this.arrayClientes = clientes;
            this.clientes = clientes.map((item) => item.Nome);
            this.codigosClientes = clientes.map((item) => item.Id);
            this.nomesClientes = clientes.map((item) => item.Nome);
          }
        });
      });
    },

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
      this.calcValores();
    },

    calcValores(){
      this.valVenda = 0.0;
      this.products.forEach(produto => {
        this.valVenda = parseFloat(this.valVenda) + parseFloat(produto.precoProduto);
      })
      this.valParcela = this.valVenda / this.numParcelas
    },

    lerEstoque(codigo, quantidade) {
      var currentUser = firebase.auth().currentUser.uid;
      let estoque = [];
      estoqueCollection.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (doc.id === currentUser) {
            estoque = doc.data();
            this.retirarEstoque(codigo, quantidade, estoque);
          }
        });
      });
    },

    retirarEstoque(codigo, quantidade, estoque) {
      var userLogado = firebase.auth().currentUser.uid;
      let quantidadeAtual = 0;
      let cont = 0;

      Object.keys(estoque).forEach(est => {
        if (est == codigo) {
          quantidadeAtual = estoque[est].qtdeProduto;
        }
      });

      if (quantidadeAtual == 0) {
        alert("O produto de código " + codigo + " não existe em estoque");
      } else {
        if (quantidade > quantidadeAtual) {
          alert(
            "O produto de código " +
              codigo +
              " não possui a quantidade necessária para a venda"
          );
        } else {
          estoqueCollection.doc(userLogado).set(
            {
              [codigo]: {
                qtdeProduto: +quantidadeAtual - +quantidade,
                codigo: codigo
              }
            },
            { merge: true }
          );
        }
      }
    },

    retirarProdutos() {
      var userLogado = firebase.auth().currentUser.uid;
      this.products.forEach(produto => {
        var codigoProduto = produto.codigoProduto;
        var codigoSet = codigoProduto + this.codigoVenda;
        // retirar do estoque
        this.lerEstoque(codigoProduto, produto.qtdeProduto);
        saidaCollection.doc(userLogado).set(
          {
            [codigoSet]: {
              CodProduto: produto.codigoProduto,
              Venda: this.codigoVenda,
              Quantidade: produto.qtdeProduto,
              Preco: produto.precoProduto
            }
          },
          { merge: true }
        );
      });
    },

    salvarVenda() {
      var currentUser = firebase.auth().currentUser.uid;
      var codVenda = this.generateGUID();
      this.codigoVenda = codVenda;
      var clienteNome = this.nomesClientes[this.clientes.indexOf(this.clienteVenda)]
      var codigoCliente = this.codigosClientes[this.clientes.indexOf(this.clienteVenda)];
      vendasCollection
        .doc(currentUser)
        .set(
          {
            [codVenda]: {
              Data: this.dataVenda,
              Cod: codVenda,
              Cliente: codigoCliente,
              NomeCliente: clienteNome,
              Valor: this.valVenda,
              Parcelas: this.numParcelas,
              ValorParcela: this.valParcela
            }
          },
          { merge: true }
        )
        .then(
          () => {
            this.retirarProdutos();
            alert("Venda cadastrada com sucesso!");
            this.$router.push({ path: "vendas" });
          },
          error => {
            alert("Erro ao cadastrar venda! Ver log para mais informacoes");
          }
        );
    },

    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}

a:hover {
  color: primary !important;
}
</style>