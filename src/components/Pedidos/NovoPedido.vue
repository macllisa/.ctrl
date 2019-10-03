<template>
    <v-card elevation="1" class="white listaPedidos ma-4">
        <v-card-title class="subtitle-1 ml-1 pt-6 py-2">NOVO PEDIDO</v-card-title>
            <v-row class="mx-3 mt-3">
                <v-text-field 
                class="px-1"
                id="codPed" 
                type="text" 
                name="codPed" 
                v-model="codPed" 
                required  
                outlined
                color="#ef7b45" 
                label="Código Pedido"/>  
                <v-text-field 
                class="px-1"
                id="dataPed" 
                type="text" 
                name="dataPed" 
                v-model="dataPed" 
                required  
                outlined
                color="#ef7b45" 
                label="Data"/> 
            </v-row>
        <v-card outlined class="white-darken-1 mx-4">
            <v-card-title class="subtitle-2">Adicionar Produto</v-card-title>
            <v-col class="px-3">
            <v-text-field 
                id="descProd" 
                type="text" 
                name="descProd" 
                v-model="descProd" 
                required  
                outlined
                color="#ef7b45" 
                label="Descrição"/>
            <v-row>
                <v-text-field 
                class="px-3"
                id="codProd" 
                type="text" 
                name="codProd" 
                v-model="codProd" 
                required  
                outlined
                color="#ef7b45" 
                label="Código"/>  
                <v-text-field 
                class="px-3"                
                id="qteProd" 
                type="number" 
                name="qteProd" 
                v-model="qteProd" 
                required  
                outlined
                color="#ef7b45" 
                label="Quantidade"/> 
                <v-text-field 
                class="px-3"
                id="precProd" 
                type="text" 
                name="precProd" 
                v-model="precProd" 
                required  
                outlined
                color="#ef7b45" 
                label="Preço Unitário"/>  
            </v-row>
            <v-row>
                <v-spacer></v-spacer>
                <v-btn outlined small class="mr-3" color="#ef7b45">
                    <v-icon small left>mdi-plus-circle-outline</v-icon><span>Adicionar</span>
                </v-btn> 
            </v-row>
            </v-col>   
        </v-card>
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
a{  
    text-decoration: none;
}

a:hover{
    color: #ef7b45 !important;
}
</style>