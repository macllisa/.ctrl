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
                <v-expansion-panel-header>{{ pedido.id }}<v-divider vertical class="mx-4"/>{{ pedido.DataEmissao }}<v-divider vertical class="mx-4"/>{{ pedido.DataRecebimento }}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div v-for="(produto, id) in produtos" :key="id">
                            <div v-if="produto.Pedido === pedido.id">
                                {{produto.CodProduto}}{{produto.Descricao}}{{produto.Quantidade}}{{produto.Preco}}
                                <v-divider/>
                            </div>
                        </div>
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
        }
    },
    created() {
        this.getDocumentPedido();
        this.getDocumentProduto();  
    },
    methods: {
        getDocumentPedido() {
            var currentUser = firebase.auth().currentUser.uid;
            pedidosCollection.get().then((snapshot) =>{
                snapshot.docs.forEach(doc =>{
                    if(doc.id === currentUser){
                        let result = doc.data();
                        // Attr = key
                        for (let key in result) {
                            let pedido = {
                                id: key
                            };
 
                            for (let attr in result[key]) {
                                pedido[attr] = result[key][attr];
                            }
                            this.pedidos.push(pedido);
                        } 
                    }
                })
            })
        },

        getDocumentProduto(){
            var currentUser = firebase.auth().currentUser.uid;
            produtosCollection.get().then((snapshot) =>{
                snapshot.docs.forEach(doc =>{
                    if(doc.id === currentUser){
                        this.produtos = doc.data();
                    } 
                })
            })
        }
    }
};
</script>
