<template>
    <div class = "container">
        <div class="row">
            <h1>Prueba Chat</h1>
            <div class ="comp1 col-md-4" v-if="comp1permitido && (pantallaGrande || componenteMostrado==1)">
                <h1>Clientes</h1>
                <div class="lista-clientes">
                    <BotonComp class ="cliente" v-for="i in 40" :key="i"> Cliente Numero {{ i }}</BotonComp>
                </div>
            </div>
            <div class = "comp2 col-md-8 col-lg-8 col-sm-12" v-if ="componenteMostrado==2 || pantallaGrande">
                <h1>Mensajes</h1>
                <div class="lista-mensajes">
                    <p class="mensaje" v-for="i in 40" :key="i"> Mensaje Numero {{ i }}</p>
                </div>
            </div>
        </div>
        <BotonComp v-if="comp1permitido && !pantallaGrande" @click="cambiarComponente">
            {{ "Mostrar " + (componenteMostrado==1 ? "Mensajes" : "Clientes") }}
        </BotonComp>
    </div>
</template>

<style>
.row{
height: 60vh;
margin: auto;
margin-top: 80px;
font-family: 'Arial-Black';
color: #ffad00;
}
.comp1{
    height: 100%;
    border: 4px solid #ffad00;
    color: #ffad00;
    padding: 20px;
    font-size: 12px;
}
.lista-clientes{
    height: 85%;
    overflow-y: auto;
    scrollbar-color: #ffad00 #444 ;
}
.comp2{
    height: 100%;
    border: 4px solid palevioletred;
    color: palevioletred;
}
.lista-mensajes{
    height: 85%;
    overflow-y: auto;
    scrollbar-color: palevioletred #444 ;
}
.cliente{
    margin: 10px;
}
.cliente :hover {
    font-size: 14px;
}
.mensaje{
    margin: 10px;
}
</style>

<script>
import BotonComp from '@/components/BotonComp.vue';

export default {
    components:{
        BotonComp,
    },
    name: 'PaginaPrueba',
    data() {
        return {
            comp1permitido:true,
            componenteMostrado:2,
            pantallaGrande: false,
        }
    },
    methods: {
        cambiarComponente(){
            if (this.componenteMostrado==1){
                this.componenteMostrado=2;
            }
            else{
                this.componenteMostrado=1;
            }
        },
        actualizarPantallaGrande(){
            this.pantallaGrande = window.innerWidth > 768;
        }
    },
    mounted(){
        this.pantallaGrande = window.innerWidth > 768;
        window.addEventListener('resize', this.actualizarPantallaGrande);
    },
}
</script>