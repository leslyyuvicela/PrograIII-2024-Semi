<template>
    <BarraMenu class="sticky-top" opcionSeleccionada="Inicio"/>
    <div class ="container-fluid ">
        <div class="buscador row ">
            <BotonComp class="btn-regresar col-1" >
                Atrás
            </BotonComp>
            <h2 class="col-2 ">MENU DE {{ categoria.toUpperCase() }}</h2>
            <span class="col-4 linea"/>
            <div class="col-4">
            <BusquedaComp :items = "productos" :camposFiltrables="['nombre', 'descripcion']" @resultados-busqueda="actualizarResultados"/>
            </div>
        </div>
        <div class ="lista-productos row">
            <div class = "col-2 producto" v-for="producto in productosFiltrados" :key="producto.id">
                <ProductoComp :producto="producto"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
*{
    font-family: 'Arial Black', sans-serif;
}
.linea{
    background-color: #ffad00;
    height: 5px;
    border-radius: 1px;
    align-self: center;
}
.container-fluid{
    margin: 0;
    border: 0;
    padding:0;
    width: 100%;
}

.btn-regresar{
    height: 45px; 
    align-content: center;
    margin : 0;
}
.buscador h2 {
    font-size: 18px;
    text-align: left;
    color: #ffad00;
    padding: 5px 10px;
    align-content: center;
}
.buscador{
    height: 100px;
    padding: 20px 15px;
    margin-top: 0;
}
.lista-productos{
    padding: 20px;
    margin-top: 0;
}
.producto{
    height: 30vh;
    transition: 0.5s;
}
.producto:hover{
    transform: scale(1.1);
    transition: 0.5s;
}
</style>

<script>
import BarraMenu from '@/components/BarraMenu.vue';
import ProductoComp from '@/components/ProductoComp.vue';
import {useAuthStore} from '@/stores/auth'; 
import ApiService from '@/services/ApiService';
import BusquedaComp from '@/components/BusquedaComp.vue';
import BotonComp from '@/components/BotonComp.vue';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

export default {
    name: 'PaginaMenu',
    components: {
        ProductoComp,
        BusquedaComp,
        BarraMenu,
        BotonComp,
    },
    setup() {
    const authStore = useAuthStore(); // Llama a la función para obtener la instancia de la tienda
    authStore.cargarDatos(); // Asegúrate de que cargarDatos se llame dentro del setup
    return {
    authStore
    };
},
    data() {
        return {
            categoria:'', 
            productos: [ 
                {
                    id: 1,
                    nombre: "Cheeseburger",
                    tipo_descuento: "porcentaje",
                    descuento: 0,
                    url_foto: "https://th.bing.com/th/id/OIP.JGigDSijh-lKRw6YaZQGVwHaDs?w=342&h=174&c=7&r=0&o=5&pid=1.7"
                },
                {
                    id: 2,
                    nombre: "Doble carne",
                    tipo_descuento: "porcentaje",
                    descuento: 0,
                    url_foto: "https://th.bing.com/th/id/OIP.IDr8Ipp1_QAlSbQIiw5YegHaHa?rs=1&pid=ImgDetMain"
                },
            ],
            productosFiltrados: [],
            usuario: this.authStore.usuario, // Obtiene el usuario actual del store
            filtro: '', // Inicializa el filtro vacio
        }
    },
    created() {
    this.categoria = this.$route.query.categoria || 'burgers'
},
watch: {
    '$route.query'(newQuery){
        this.categoria = newQuery.categoria || 'burgers'
    }
},
    mounted() {
        // Llama al metodo para obtener productos sin filtro al montar el componente
        this.obtenerProductos(this.categoria, this.filtro);
    },
    methods: {
        async obtenerProductos(categoria, filtro) {
            const { error, datos, mensaje } = await ApiService.obtenerProductos(categoria, filtro);
            if (!error) {
                this.productos = datos; // Asigna la lista de productos
                this.productosFiltrados = datos; // Asigna la lista de productos filtrados
            } else {
                alertify.error(mensaje); // Manejo de eerores basico para mostrar un mensaje en la consola en caso de que la solicitud falle
            }
        },
        actualizarResultados(resultados) {
            this.productosFiltrados = resultados; // Actualiza la lista de productos filtrados
        },
    },
    computed: {
        
    },
}
</script>