<template>
  <BarraMenu class ="sticky-top" opcionSeleccionada="Carrito" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <div class="container">
    <div class="cart">
      <h2>CARRITO ({{ cantidadProductos }})</h2>
      <div class="select-all">
        <input type="checkbox" id="select-all" @change="seleccionarTodos">
        <label for="select-all">SELECCIONAR TODOS</label>
        <button class="delete" @click="borrarProductos">
          ELIMINAR <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <div v-for="producto in productos" :key="producto.id" class="cart-item">
        <div class="item-info">
          <input type="checkbox" class="item-checkbox" v-model="producto.seleccionado">
          <img :src="producto.imagen" :alt="producto.nombre">
          <a :href="'/producto/' + producto.id" style="text-decoration: none">
            
          <div class="item-details">
            <h3>{{ producto.nombre }}</h3>
            <p>{{ producto.detalles }}</p>
          </div>
          </a>
        </div>
        <div class="quantity">
          <button @click="restarProducto(producto.id)">-</button>
          <span>{{ producto.cantidad }}</span>
          <button @click="sumarProducto(producto.id)">+</button>
        </div>
        <span class="price">${{ producto.precio }}</span>
      </div>
    </div>
    <div class="order">
      <h2>REALIZA TU PEDIDO</h2>
      <div class="order-option">
        <p>Escoge el tipo de entrega</p>
        <select v-model="tipoEntrega">
          <option value="">Selecciona una opción</option>
          <option value="domicilio">Domicilio</option>
          <option value="local">Recoger en tienda</option>
        </select> 
      </div>
      <div class="order-option">
        <p>Selecciona la dirección</p>
        <select v-model="direccionSeleccionada">
          <option value="">Selecciona una opción</option>
          <option v-for="direccion in direcciones" :key="direccion.id" :value="direccion.id">{{ direccion.nombre }}</option>
        </select>
      </div>
      <div class="order-option">
        <p>Escoge el método de pago</p>
        <select v-model="metodoPago">
          <option value="">Selecciona una opción</option>
          <option value="efectivo">Efectivo</option>
          <option value="tarjeta">Tarjeta</option>
        </select>
      </div>
      <div class="total">
        <p>Total:</p>
        <span>${{ totalCarrito}}</span>
      </div>
      <BotonComp @click="realizarPedido">PEDIR</BotonComp>
    </div>
  </div>
</template>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Arial Black", Gadget, sans-serif;
}

body, html {
  background-color: #000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
}
select{
  margin: auto 0;
  background-color: #ffad00;
  color: #000;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}
select option{
  background: #000;
  color: #ffad00;
}

.cart,
.order {
  background-color: #333;
  padding: 20px;
  border-radius: 5px;
  width: 70%;
  min-width: 500px;
}
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
  .cart, .order {
    flex:1;
  }
}

.cart h2,
.order h2 {
  color: #ffad00; 
  font-size: 1.2em;
  margin-bottom: 15px;
  width: 100%;
  min-width: 300px;
}

.cart h2 {
  text-align: center;
  font-size: 1.2em;
  width: 0.1px;
  min-width: 300px;
  font-weight: bold;
}

.select-all {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  justify-content: space-between;
}

.select-all label {
  color:  #ffad00; 
}

.select-all input[type="checkbox"],
.item-checkbox {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #ffad00;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  margin-right: 10px;
}

.select-all input[type="checkbox"]:checked,
.item-checkbox:checked {
  background-color: #ffad00;
}


.delete {
  margin-left: auto;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 0.9em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20px;
}


.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  transition: 0.5s;
}
.cart-item:hover {
  transform: scale(1.02);
  transition: 0.5s;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-info img {
  width: 40px;
  height: 40px;
  border-radius: 5px;
}

.item-details h3 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
  font-size: 1em;
  color: #ffad00; 
  margin-bottom: 5px;
}

.item-details p {
  font-size: 0.8em;
  color:  #ffad00; 
} 

.quantity {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #ffad00;
}

.quantity button {
  background-color: #333;
  border: none;
  color:  #ffad00;
  font-size: 1em;
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 3px;
}

.price {
  color: #ffad00;
  font-size: 1em;
}

.order-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  color: #ffffff;
}

.order-option p {
  font-size: 0.9em;
  color: #ffffff; 
}

.order-option button {
  background-color: #ffad00;
  border: none;
  padding: 5px 10px;
  color: #000;
  cursor: pointer;
  border-radius: 5px;
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 1.2em;
  color: #ffad00; 
}

.total p {
  font-size: 1em;
  color: #ffffff; 
}

.total span {
  color: #ffad00; 
  font-size: 1em;
}
</style>

<script>
import BarraMenu from '@/components/BarraMenu.vue';
import BotonComp from '@/components/BotonComp.vue';
import ApiService from "@/services/ApiService"; 
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
export default {
  name: 'PaginaCarrito',
    components: {
        BarraMenu,
        BotonComp,
    },
  data() {
    return {
      productos: [],
      direcciones: [],
      direccionSeleccionada: "",
      tipoEntrega: "",
      metodoPago: "",

      cambiosRealizados: false,
      intervalo: null,
    };
  },
  computed: {
    totalCarrito() {
      return this.productos
        .filter((producto) => producto.seleccionado)
        .reduce((acc, producto) => acc + producto.precio*producto.cantidad, 0);
    },
    cantidadProductos() {
      //Contar solo los productos seleccionados y calcular la cantidad total
      const productosSeleccionados = this.productos.filter((p) => p.seleccionado);
      return productosSeleccionados.reduce((acc, producto) => acc + producto.cantidad, 0);
    },
  },
  methods: {
    async obtenerCarrito() {
      const respuesta = await ApiService.obtenerCarrito(); 
      if (!respuesta.error) {
        this.productos = respuesta.datos.productos;
        this.tipoEntrega = respuesta.datos.tipo_entrega;
        this.direccionSeleccionada = respuesta.datos.id_direccion ? respuesta.datos.id_direccion : "";
        this.metodoPago = respuesta.datos.metodo_pago;
      } else {
        alertify.error(respuesta.mensaje);
      }
    },
    async obtenerDirecciones() {
      const respuesta = await ApiService.obtenerDirecciones(); 
      if (!respuesta.error) {
        this.direcciones = respuesta.datos;
      } else {
        alertify.error(respuesta.mensaje);
      }
    },
    async actualizarCarrito() {
      if (this.cambiosRealizados) {
      this.cambiosRealizados = false;
        
      const productosActualizados = this.productos.map(({ id, cantidad, seleccionado }) => ({ id, cantidad, seleccionado }));
      const data = {
        productos: productosActualizados,
        tipo_entrega: this.tipoEntrega,
        id_direccion: this.direccionSeleccionada,
        metodo_pago: this.metodoPago,
      };
      const respuesta = await ApiService.actualizarCarrito(data); 
      if (respuesta.error) {
        alertify.error(respuesta.mensaje);
      }
      else {
        this.obtenerCarrito();
      }
    }
    },
    async realizarPedido() {
      const productosPedido = this.productos.filter((p) => p.seleccionado);
      if (productosPedido.length === 0 || !this.tipoEntrega || !this.metodoPago || !this.direccionSeleccionada) {
        alertify.error("Por favor completa todos los campos y selecciona al menos un producto.");
        return;
      }
      const data = {
        productos: productosPedido.map(({ id, cantidad }) => ({ id, cantidad })),
        tipo_entrega: this.tipoEntrega,
        id_direccion: this.direccionSeleccionada,
        metodo_pago: this.metodoPago,
      };
      const respuesta = await ApiService.realizarPedido(data.productos,data.tipo_entrega,data.id_direccion,data.metodo_pago);
      alertify.success("Pedido realizado");
      this.$router.push('/');
      if (respuesta.error) {
        alertify.error(respuesta.mensaje);
      } else {
        alertify.success("Pedido realizado con éxito");
        await this.obtenerCarrito();
      }
    },
    async sumarProducto(id) {
      this.productos.find((p) => p.id === id).cantidad++;
    },
    async restarProducto(id) {
      const producto = this.productos.find((p) => p.id === id);
      const cantidad = producto.cantidad;
      if (cantidad === 1) {
      alertify.confirm(
          'Eliminar producto',
          '¿Deseas eliminar este producto del carrito?',
          async () => {
            const respuesta = await ApiService.borrarProductos([id]);
            if (!respuesta.error) {
              await this.obtenerCarrito();
            } else {
              alertify.error(respuesta.mensaje);
            }
          },
          function() {} 
        );

    }else {
      producto.cantidad--;
    }
  },
    async borrarProductos() {
      const productosSeleccionados = this.productos.filter((p) => p.seleccionado);
      if (productosSeleccionados.length === 0) return;
      alertify.confirm(
        'Eliminar productos',
        '¿Deseas eliminar los productos seleccionados?',
        async () => {
          const ids = productosSeleccionados.map((p) => p.id);
          const respuesta = await ApiService.borrarProductos(ids); 
          if (!respuesta.error) {
            await this.obtenerCarrito();
          } else {
            alertify.error(respuesta.mensaje);
          }
        },
        function() {} 
      );
    },
    seleccionarTodos() {
      this.productos.forEach((producto) => {
        producto.seleccionado = true;
      });
    },

  },
  async mounted() {
    this.intervalo = setInterval(this.actualizarCarrito, 1000);
    await this.obtenerCarrito();
    await this.obtenerDirecciones();
  },
  beforeUnmount() {
    clearInterval(this.intervalo);
    this.actualizarCarrito();
  },
  watch: {
    cantidadProductos() {
      this.cambiosRealizados = true;
    },
    tipoEntrega() {
      this.cambiosRealizados = true;
    },
    direccionSeleccionada() {
      this.cambiosRealizados = true;
    },
    metodoPago() {
      this.cambiosRealizados = true;
    },
  }
};
</script>