<template>
    
    <v-card elevation="1" class="white listaPedidos ma-4">
        <v-row class="pa-4">
            <v-card-title class="subtitle-1 font-weight-bold">CLIENTES:</v-card-title>
            <v-spacer></v-spacer>
            <v-card-actions class="pr-3">
                <v-btn small depressed dark color="primary" router to="/novoCliente">Novo Cliente</v-btn>
            </v-card-actions>
        </v-row>
        <v-simple-table fixed-header class="px-6 pb-4">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Nome</th>
                        <th class="text-left">Telefone</th>
                        <th class="text-left">Email</th>
                        <th class="text-left">Endereço</th>
                        <th class="text-left">Aniversário</th>
                    </tr>
                </thead>
            <tbody>
                <tr v-for="cliente in clientes" :key="cliente.Nome">
                    <td>{{ cliente.Nome }}</td>
                    <td>{{ cliente.Telefone }}</td>
                    <td>{{ cliente.Email }}</td>
                    <td>{{ cliente.Endereco }}</td>
                    <td>{{ cliente.Aniversario }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </v-card>
</template>

<script>
import firebase from 'firebase';
import {clientesCollection } from '../../firebase.js';

export default {
    data() {
        return {
            clientes: [],
        }
    },
    created() {
        this.getClientes()
    },
    methods:{
        getClientes(){
            let currentUser = firebase.auth().currentUser.uid;
            clientesCollection.get().then((snapshot) =>{
                snapshot.docs.forEach(doc =>{
                    if(doc.id === currentUser){
                        this.clientes = doc.data()
                    } 
                })
            })
        }
    }      
}
</script>
