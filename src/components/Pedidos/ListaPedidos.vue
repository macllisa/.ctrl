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
            <v-expansion-panel v-for="pedido in pedidos" :key="pedido">
                <v-expansion-panel-header>Pedido: {{ pedido.codigo }} | Data: {{ pedido.datPed }}</v-expansion-panel-header>
                <v-expansion-panel-content v-for="produto in produtos" :key="produto">
                    {{ codProd }} | {{ descProd }} | {{ qtdeProd }} | {{ precProd }}
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>

<script>

export default {
    data(){
        return{
            pedidos: []
        }
    }
}
</script>
