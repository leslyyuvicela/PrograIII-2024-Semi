<template>
  <BarraMenu class="sticky-top"/>
    <div class="container">

        <h1 class="header-title">{{producto.categoria}}</h1>

        <div class="product-view row">
            <div class="product-image col-sm-12 col-md-4 col-lg-4">
                <img :src="producto.imagen" alt="Imagen de la Burger Clasica" class="product-img">
                <p class="price">
                    <span class="previous-price" v-if="producto.precio_anterior" > ${{producto.precio_anterior.toFixed(2)}} </span>
                    <span class="current-price"> ${{producto.precio.toFixed(2)}} </span>
                </p>
                <p class="description">{{producto.descripcion}}</p>
            </div>
            <div class="product-info col-sm-12 col-md-8 col-lg-8">
              <div class="personalization">
                  <h2 class="product-name">{{ producto.nombre }}</h2>

                  <div v-for="tipoIngrediente in producto.seleccion_ingredientes" :key="tipoIngrediente.id_tipo">
                      <h3 class="titulo-tipo-ingrediente" style="cursor: pointer;"
                      @click="clickColapse(tipoIngrediente.id_tipo)"> 
                        {{ tipoIngrediente.titulo }}
                      </h3>

                    <b-collapse v-model="collapsesVisibles[tipoIngrediente.id_tipo]">
                    <b-form-radio-group stacked v-if="tipoIngrediente.maximo === 1" v-model="tipoIngrediente.ingredientes_seleccionados[0]"
                    :name="'tipoIngrediente-' + tipoIngrediente.id_tipo" :options="tipoIngrediente.ingredientes_options"/>

                    <ul v-else>
                      <li v-for="ingrediente in tipoIngrediente.ingredientes" :key="ingrediente.id" class="ingrediente">
                        <span>{{ ingrediente.nombre }} + ${{ ingrediente.precio.toFixed(2) }}</span>
                        <div class="quantity-controls">
                          <button @click="restarIngrediente(ingrediente.id, tipoIngrediente.id_tipo)">-</button>
                          <span v-if="ingredienteSeleccionado = tipoIngrediente.ingredientes_seleccionados.find(ing => ing.id === ingrediente.id)">
                            {{ ingredienteSeleccionado.cantidad }}
                          </span>
                          <span v-else>0</span>
                          <button @click="sumarIngrediente(ingrediente.id, tipoIngrediente.id_tipo)">+</button>
                        </div>
                      </li>
                    </ul>
                  </b-collapse>
                  </div>
                  <div class="detalle-producto">
                  <CajaTexto type="text"  v-model="form.detalle" placeholder="Detalles adicionales (opcional)" />
                  </div>
              </div>
                <div class="order-section">
                  <div class = "quantity">
                  <p class = "quantity-text">Cantidad:</p>
                  <div class="quantity-controls">
                      <!-- Botones para cambiar la cantidad -->
                      <button id="subtract" @click="restarCantidad">-</button>
                      <span id="quantity" class="quantity-text">{{ cantidad }}</span>
                      <button id="add" @click="sumarCantidad">+</button>
                  </div>
                  </div>
                  <div class = "total-and-button">
                    <div class="total-container">
                        <span class="total-label">Total:</span>
                        <span>${{ total }}</span>
                    </div>
                        <!-- Botón para añadir al carrito -->
                        <BotonComp class="btn-carrito" @metodo_click="agregarACarrito">Añadir a mi orden 🛒</BotonComp>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Arial Black", Gadget, sans-serif;
    color: #fff;
}

.product-image, .product-info{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  gap: 20px;
}
.product-info{
  height: 80vh;
}
.container {
    max-width: 1200px;
    height: 70vh;
    margin: 0 auto;
    padding: 20px;
}

.header-title {
    text-align: center;
    font-size: 1.8em;
    color: #fff;
    margin-bottom: 20px;
    font-weight: bold;
}

.product-img {
    width: 100%; 
    object-fit: cover;
    border-radius: 8px;
    background-color: transparent;
}

.discount-text {
    font-size: 0.9em;
    color: #ffad00;
    text-align: center;
    margin-bottom: 10px;
    font-weight: bold;
    width: 100%;
}


.personalization {
  background-color: #111;
  border-radius: 10px;
  height: 100%;
  overflow-y: auto;
  scrollbar-color: #ffad00 #444 ;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  align-items: center;
}

.price {
    margin: 0 auto;
    width: 90%;
    display: flex;
    flex-direction: row;
    font-weight: bold;
    justify-content: space-between;
}

.previous-price {
    text-decoration: line-through;
    color: #ffad00;
    font-size: 1.1em;
}

.current-price {
    color: #fff;
    font-size: 1.3em;
}

.description {
    font-size: 0.9em;
    color: #fff;
    max-width: 500px;
    font-weight: bold;
    text-align: left;
}

.product-name {
    font-size: 1.6em;
    font-weight: bold;
    color: #ffad00;
}
.order-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
}
.titulo-tipo-ingrediente {
    font-size: 1.3em;
    font-weight: bold;
    color: #ffad00;
    text-align: center;
}
.ingrediente {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 100%;
    justify-content: center;
}
.detalle-producto {
    width: 90%;
    
}
.quantity, .total-and-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10%;
    width: 100%;
    justify-content: center;
}
.total-container {
    font-size: 1.2em;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 5px;
}

.total-label {
    color: #fff;
}

.total-container span:last-child {
    color: #ffad00;
}

.controls-and-button {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    margin-top: 15px;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    font-weight: bold;
}

.quantity-controls button {
    background: none;
    border: none;
    padding: 5px 10px;
    color: #ffad00;
    font-weight: bold;
    font-size: 1.2em;
    cursor: pointer;
}

.quantity-text {
    font-size: 1.2em;
    color: #fff;
}

</style>

<script>
import BarraMenu from '@/components/BarraMenu.vue';
import BotonComp from '@/components/BotonComp.vue';
import CajaTexto from '@/components/CajaTexto.vue';
import ApiService from '@/services/ApiService';
import Alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';
export default{
    name: 'PaginaProducto',

    components: {
        BotonComp,
        CajaTexto,
        BarraMenu,
    },
    data() {
    return {
      collapsesVisibles: {
        1: false,
        2: false,
      },
      producto: {
        id: 0,  
        nombre: 'Burger Clasica',
        descripcion: 'Lorem ipsum dolor',// sit amet, consectetur adipiscing elit. Sed ac nunc nec nisl ultrices tincidunt. Nullam nec nunc nec nisl ultrices tincidunt. Nullam nec nunc nec nisl ultrices tincidunt.',
        categoria: 'Burgers',
        precio_anterior: 4.75,
        precio: 4.00,
        imagen: 'https://proyectodb.blob.core.windows.net/imgs/Burger_de_la_casa.jpeg',
        seleccion_ingredientes : [
    {
        id_tipo: 1,
        titulo: 'Selecciona el tipo de carne',
        minimo: 1,
        maximo: 1,
        multiple: false,
        ingredientes: [
            {
                id: 1,
                nombre: 'Carne de res',
                precio: 0,
            },
            {
                id: 2,
                nombre: 'Carne de pollo',
                precio: 0,
            }
        ],
        ingredientes_seleccionados: [],
        ingredientes_options: [
            { text: 'Carne de res', value: 1},
            { text: 'Carne de pollo', value: 2}
        ]
    },
    {
        id_tipo: 2,
        titulo: 'Elige ingredientes adicionales (máximo 4)',
        minimo: 0,
        maximo: 4,
        multiple: true,
        ingredientes: [
            {
                id: 3,
                nombre: 'Queso',
                precio: 1.15
            },
            {
                id: 4,
                nombre: 'Tocino',
                precio: 0.75
            },
            {
                id: 5,
                nombre: 'Pepinillos',
                precio: 0.50
            },
            {
                id: 6,
                nombre: 'Cebolla',
                precio: 0.25
            },
            {
                id: 7,
                nombre: 'Lechuga',
                precio: 0.25
            },
            {
                id: 8,
                nombre: 'Tomate',
                precio: 0.25
            }
        ],
        ingredientes_seleccionados: []
    }
    
]
      },
      cantidad: 1,
      form: {
        detalle: '',
      },
      errores: {
        detalle: false,
      },
    };
  },
  methods: {
    clickColapse(idTipo) {
      this.collapsesVisibles[idTipo] = !this.collapsesVisibles[idTipo];
    },
    sumarCantidad() {
      this.cantidad++;
    },

    
    restarCantidad() {
      if (this.cantidad > 1) {
        this.cantidad--;
      }
    },
    sumarIngrediente(idIngrediente, idTipo) {
      const tipoIngrediente = this.producto.seleccion_ingredientes.find(tipo => tipo.id_tipo === idTipo);
      const ingrediente = tipoIngrediente.ingredientes_seleccionados.find(ing => ing.id === idIngrediente);
      if (ingrediente) {
        ingrediente.cantidad++;
      }
      else {
        tipoIngrediente.ingredientes_seleccionados.push({
          id: idIngrediente,
          cantidad: 1,
        });
      }
    },
    restarIngrediente(idIngrediente, idTipo) {
      const tipoIngrediente = this.producto.seleccion_ingredientes.find(tipo => tipo.id_tipo === idTipo);
      const ingrediente = tipoIngrediente.ingredientes_seleccionados.find(ing => ing.id === idIngrediente);
      if (ingrediente) {
        if (ingrediente.cantidad > 1) {
          ingrediente.cantidad--;
        }
        else {
          tipoIngrediente.ingredientes_seleccionados = tipoIngrediente.ingredientes_seleccionados.filter(ing => ing.id !== idIngrediente);
        }
      }
    },

    async agregarACarrito() {
      let ingredientes = [];
      this.producto.seleccion_ingredientes.forEach((tipoIngrediente) => {
        if (tipoIngrediente.minimo === 1 && tipoIngrediente.maximo === 1 && tipoIngrediente.ingredientes_seleccionados.length > 0) {
            ingredientes.push({
              id: tipoIngrediente.ingredientes_seleccionados[0],
              cantidad: 1,
            });
        }
        else {
          tipoIngrediente.ingredientes_seleccionados.forEach((ingrediente) => {
            ingredientes.push({
              id: ingrediente.id,
              cantidad: ingrediente.cantidad,
            });
          });
        }
      });
      const datosCarrito = {
        id: this.producto.id,  
        cantidad: this.cantidad,
        ingredientes: ingredientes,  
        detalles: this.form.detalle,  
      };

      const respuesta = await ApiService.agregarACarrito(datosCarrito);
      if (!respuesta.error) {
        console.log('Producto agregado al carrito:', respuesta.datos);
        //Regresar a la página anterior
        this.$router.go(-1);
        Alertify.success('Producto agregado al carrito');
      } else {
        Alertify.error(respuesta.mensaje);
      }
    },
    async CargarProducto(id){
        ApiService.obtenerProducto(id)
      .then((respuesta) => {
        if (!respuesta.error) {
          this.producto = respuesta.datos;
          this.collapsesVisibles = {};
          this.producto.seleccion_ingredientes.forEach((tipoIngrediente) => {
            tipoIngrediente.ingredientes_seleccionados = [];
            if (tipoIngrediente.minimo === 1 && tipoIngrediente.maximo === 1) {

              tipoIngrediente.ingredientes_seleccionados.push(tipoIngrediente.ingredientes[0].id);
              tipoIngrediente.ingredientes_options = tipoIngrediente.ingredientes.map(ingrediente => ({
                text: ingrediente.precio === 0 ? ingrediente.nombre : `${ingrediente.nombre} + $${ingrediente.precio.toFixed(2)}`,
                value: ingrediente.id,
              }));
            }
            else {
              tipoIngrediente.ingredientes_seleccionados = [];
              tipoIngrediente.ingredientes.forEach((ingrediente) => {
                tipoIngrediente.ingredientes_seleccionados.push({
                  id: ingrediente.id,
                  cantidad: 0,
                });
              });
            }
            this.collapsesVisibles[tipoIngrediente.id_tipo] = false;
          });
        } else {
          console.error('Error al obtener producto:', respuesta.mensaje);
          Alertify.error('Error al obtener producto');
        }
      });
    },
  },

  computed: {
   
    total() {
      let precioTotal = this.producto.precio* this.cantidad;
      this.producto.seleccion_ingredientes.forEach((tipoIngrediente) => {
        if (tipoIngrediente.minimo === 1 && tipoIngrediente.maximo === 1) {
          if (tipoIngrediente.ingredientes_seleccionados.length > 0) {
            precioTotal += tipoIngrediente.ingredientes.find(ingrediente => ingrediente.id === tipoIngrediente.ingredientes_seleccionados[0]).precio;
          }
        }
        else {
        tipoIngrediente.ingredientes_seleccionados.forEach((ingrediente) => {
          precioTotal += ingrediente.cantidad * tipoIngrediente.ingredientes.find(ing => ing.id === ingrediente.id).precio;
        });
      }
      });
      return (precioTotal).toFixed(2);    
    }
  },
  created() {
  const id = this.$route.params.id;
  if (id) {
    this.CargarProducto(id);
  }
},
};
</script>