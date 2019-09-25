<template>
    <v-container fluid>
        <v-row>
        <v-col align='center' justify='center'>
            <v-img src="../assets/images/logo.png" width='170px' class="my-12"/>
                <v-card class="amber darken-4 white--text" width="90%">
                    <v-form class="px-6 pt-6">
                        <v-text-field box color="white" label="Email" />
                        <v-text-field box color="white" label="Senha" />
                    </v-form>
                    <v-btn small class=" mt-5 mb-10 white amber--text text--darken-4">
                        <span>Login</span>
                    </v-btn>
                </v-card>
        </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    
}
</script>

<style scoped>
</style>