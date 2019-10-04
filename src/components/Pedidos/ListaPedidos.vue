<template>
    <v-card elevation="1" class="white listaPedidos ma-4">
        <v-row class="pa-4">
            <v-card-title class="subtitle-1 font-weight-bold">PEDIDOS:</v-card-title>
            <v-spacer></v-spacer>
            <v-card-actions class="pr-3">
                <v-btn small depressed dark color="primary" router to="/novoPedido">Novo Pedido</v-btn>
            </v-card-actions>
        </v-row>
        <v-expansion-panels accordion class="px-4 pb-4">
            <v-expansion-panel v-for="(pedido, idx) in pedidos" :key="idx">
                <v-expansion-panel-header>Pedido: {{ pedido.codigoPedido }} | Data: {{ pedido.dataEmissaoPedido }}</v-expansion-panel-header>
                <v-expansion-panel-content v-for="(produto, idx) in produtos" :key="idx">
                    {{ produto.codigoProduto }} | {{ produto.descricaoProduto }} | {{ produto.qtdeProduto }} | {{ produto.precoProdoto }}
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>

<script>
import firebase from 'firebase';
import { pedidosCollection } from '../../firebase.js';
import { produtosCollection } from '../../firebase.js';

export default {
    data() {
        return {
            pedidos: [],
            produtos: []
        }
    },
    created() {
        this.getPedidos();
    },
    methods: {
        getPedidos() {
            var pedidos = pedidosCollection;
            var produtos = produtosCollection.doc(firebase.auth().currentUser.uid);
            this.pedidos = pedidos;
            this.produtos = produtos.produtos;
            console.log(pedidos) /* eslint-disable-line no-console */
            console.log(produtos) /* eslint-disable-line no-console */
        }   
    }
};
</script>
