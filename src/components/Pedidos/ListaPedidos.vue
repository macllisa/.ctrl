<template>
    <v-card elevation="1" class="white listaPedidos ma-4">
        <v-row class="pa-4">
            <v-card-title class="title">PEDIDOS:</v-card-title>
            <v-spacer></v-spacer>
            <v-card-actions class="pr-3">
                <v-btn small depressed dark color="#ef7b45" router to="/novoPedido">Novo Pedido</v-btn>
            </v-card-actions>
        </v-row>
        <v-expansion-panels accordion class="px-4 pb-4">
            <v-expansion-panel v-for="(item,i) in 10" :key="i">
                <v-expansion-panel-header>Pedido #000001</v-expansion-panel-header>
                <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit laudantium consequatur necessitatibus tempora iure corporis itaque voluptate. Quod explicabo iusto debitis, consequatur inventore, corporis ex eligendi tenetur a dolorem iure.
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>

<script>

export default {
    data(){
        return{

        }
    }
}
</script>

<style scoped>

</style>