<template>
    <div class="contenedor" @click="mostrarProducto(producto.id)">
        <img :src="producto.url_foto" :alt="producto.nombre">
        <h3>{{producto.nombre}}</h3>
    </div>
</template>

<style scoped>
*{
    font-family: 'Arial Black', sans-serif;
}
.contenedor{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff3;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
}

img{
    width: 100px;
    height: 100px;
    border-radius: 10px;
}
h3{
    color: #ffad00;
    font-size: 20px;
    margin-top: 10%;
}
</style>

<script>
export default {
    name: 'ProductoComp',
    data() {
        return {
            
        }
    },
    props: {
        producto: {
            type: Object,
            required: true
        }
    },
    methods: {
        mostrarProducto(id){
            window.location.href = `/producto/${id}`;
        }
    },
    computed: {
        
    },
}

</script>