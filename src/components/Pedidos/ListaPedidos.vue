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
            <v-expansion-panel v-for="(pedido, idx) in pedidosCompletos" :key="idx">
                <v-expansion-panel-header>Pedido: {{ pedido.codigoPedido }} | Data: {{ pedido.dataEmissaoPedido }}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        {{ pedido.codigoProduto }} | {{ pedido.descricaoProduto }} | {{ pedido.qtdeProduto }} | {{ pedido.precoProdoto }}
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
            produtos: [],
            pedidosCompletos: []
        }
    },
    created() {
        this.getPedidos();
    },
    methods: {
        getPedidos() {
            var pedidos = [];
            var produtos = [];

            pedidosCollection.where("usuario", "==", firebase.auth().currentUser.uid).get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    pedidos.push(doc.data());
                    console.log(doc.data()) /* eslint-disable-line no-console */
                });
            })
            .catch(function(error) {
                console.log("Erro ao obter pedidos.", error)/* eslint-disable-line no-console */
            });

            produtosCollection.doc(firebase.auth().currentUser.uid).get()
            .then(
                (doc) => {
                    console.log('Sucesso ao obter produtos.'); /* eslint-disable-line no-console */
                    console.log(doc.data().produtos);  /* eslint-disable-line no-console */
                    produtos.push(doc.data().produtos);
                },
                (error) => {
                    console.log('Erro ao obter produtos: ' + error);/* eslint-disable-line no-console */
                }
            );

            this.produtos = produtos;
            this.pedidos = pedidos;
            setTimeout(function() { this.   setPedidosCompletos(produtos, pedidos) }.bind(this), 5000);
        },
        setPedidosCompletos(produtos, pedidos) {
            // TODO pedidos retorna um object e produtos um array - o retorno de pedidoCompleto deve ser um array
            pedidos.forEach(pedido => {
                var novoPedido = [];
                var pedidoCompleto = [];

                var produtos = this.produtos.filter(produto => (produto.codigoPedido == pedido.codigoPedido));
                novoPedido = [Object.values(pedido), produtos];
    
                pedidoCompleto.push(novoPedido);
                this.pedidosCompletos.push(pedidoCompleto);
                console.log("novop edio", novoPedido) /* eslint-disable-line no-console */
            });
        }   
    }
};
</script>
