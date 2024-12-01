<template>
    <div>
        <button 
        :id="id" 
        class="btn-componente"
        @click="metodoClick">
        <slot class="contenido"/>
        <img  :src="icono" v-if="icono" class="icon">
        </button>
    </div>
</template>

<style scoped>
    * {
        font-family: "Arial Black", Gadget, sans-serif;
    }
    .btn-componente {
        margin: auto 0;
        background-color: #ffad00;
        color: #000;
        border: none;
        padding: 10px;
        cursor: pointer;
        width: 100%;
        border-radius: 5px;
        display:grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        justify-items: center;
        position: relative;
    }
    
    .contenido {
        grid-column: 1/2;
        text-align: center;
    }

    .icon {
        color: #000;
        width: 30px;
        height: 30px;
        grid-column: 2/3;
    }
    .btn-componete:hover {
        opacity: 0.7;
    }



</style>

<!-- C U I D A D I T O -->

<script>
export default {
    name: 'BotonComp',
    data() {
        return {
            
        }
    },
    props: {
        id: {
            type: String,
            default: null,
        },
        icono: {
            type: String,
            default: null,
        },
    },
    methods: {
        metodoClick() {
            this.$emit('metodo_click')
        }
    },
    computed: {
        
    },

}
</script>