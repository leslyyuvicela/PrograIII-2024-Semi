<template>
  <BarraMenu class="sticky-top" opcionSeleccionada="Atencion al cliente"/>
  <div class="container">
    <h1>
      Chat de atención al cliente
      <span v-if="usuario.esEmpleado && clienteActual">
        - {{ clienteActual.nombre }}
      </span>
      <span v-if="versionIA"> - IA</span>
      <button 
          class="btn-cambiar-componente" 
          v-if="usuario.esEmpleado && !pantallaGrande" 
          @click="cambiarComponente"
        >
          <i class="bi bi-arrow-repeat"></i>
        </button>
    </h1>

    <div class="row">
      <div 
        class="mensajes-container col-md-4" 
        v-if="usuario.esEmpleado && (pantallaGrande || componenteMostrado === 1)"
      >
        <h2>Clientes</h2>
        <div class="lista-clientes">
          <div 
            v-for="cliente in clientes" 
            :key="cliente.id" 
            class="cliente" 
            @click="seleccionarCliente(cliente)"
          >
          <div class="titulo-cliente">
            <strong>{{ cliente.nombre }}</strong>
            <small>{{cliente.fecha_ultimo_mensaje }}</small>
          </div>
            <p class="ultimo-mensaje">
              {{ cliente.ultimo_mensaje }}
            </p>
          </div>
        </div>
      </div>

      <div 
        class="comp2 col-sm-12" :class="{ 'col-md-8':usuario.esEmpleado && clienteActual, 'col-12':!usuario.esEmpleado || !clienteActual }"
        v-if="componenteMostrado === 2 || pantallaGrande"
      >
        <h2>Mensajes</h2>
        <div class="lista-mensajes" ref="listaMensajes">
          <div 
            v-for="(mensaje, index) in mensajes" 
            :key="index" 
            :class="['mensaje', mensaje.enviado ? 'enviado' : 'recibido']"
          >
          <p>{{ mensaje.contenido }}</p>
          <small>{{ mensaje.fecha }}</small>
          </div>
        </div>

        <div class="input-container">
          <button class="btn-cambiar-version" @click="cambiarVersion">
            <i class="bi bi-robot"></i>
        </button>
        <CajaTexto
          class="input-nuevo-mensaje"
          v-model="mensajeActual" 
          placeholder="Escribe tu mensaje..."
          
        />
        <button class="btn-enviar-mensaje" @click="enviarMensaje">
          <i class="bi bi-send-fill"></i>
          </button>
        </div>
      </div>
    </div>



  </div>
</template>

<style>
h1 {
  margin-top: 20px;
  text-align: center;
  font-family: 'Arial-Black';
  color: #ffad00;
}


.row {
  margin-top: 20px;
  height: 72vh;
  display: flex;
}

.mensajes-container, .comp2 {
  padding: 20px;
  border: 2px solid #ffad00;
  border-radius: 10px;
  color: #ffad00;
}

.lista-clientes, .lista-mensajes {
  height: 90%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-color: #ffad00 #444;
  scrollbar-width: thin;
  scroll-behavior: smooth;
}
.lista-mensajes{
  height: 80%;
  padding: 0 10px;
}

.cliente {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.cliente:hover {
  background-color: #fff3;
  border-radius: 10px;
}

.titulo-cliente {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.titulo-cliente strong {
  font-size: 1.2em;
}

.titulo-cliente small {
  font-size: 0.8em;
}

.ultimo-mensaje {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
  color: white;
  text-align: left;
  margin-bottom: 0;
}

.mensaje {
  margin: 10px 0;
  padding: 5px 10px;
  border-radius: 10px;
  color: #fff;
  width: auto;
  max-width: 80%;
}
.mensaje p {
  margin: 0;
}
.mensaje small {
  font-size: 0.7em;
  color: #fffc;
  margin:0;
}

.mensaje.enviado {
  background-color: #fff8;
  text-align: right;
  border-bottom-right-radius: 0;
  margin-left: auto;
}

.mensaje.recibido {
  background-color: #fff3;
  text-align: left;
  border-bottom-left-radius: 0;
  margin-right: auto;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.enviar-btn {
  background-color: #ffad00;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

.enviar-btn:hover {
  background-color: #ff8c00;
}

.btn-cambiar-version, .btn-cambiar-componente, .btn-enviar-mensaje {
  background: none;
  border: none;
  color: #ffad00;
  cursor: pointer;
  font-size: 24px;
  color: #ffad00;
  margin: 5px;
}

</style>

<script>
//Importaciones de componentes

import { useAuthStore } from "@/stores/auth";
import ApiService from "@/services/ApiService"; 
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import BarraMenu from "@/components/BarraMenu.vue";
import CajaTexto from "@/components/CajaTexto.vue";
//Fin de importaciones de componentes

export default {
  components: {
    BarraMenu,
    CajaTexto,
  },
    name: 'PaginaChat',
    data() {
        return {
            mensajesContainerpermitido: true,
            componenteMostrado: 2, // 1 = Clientes, 2 = Mensajes
            pantallaGrande: false,
            versionIA: false,
            mensajeActual: "",
            mensajes: [
              {
                contenido: "Mensaje de prueba",
                enviado: false,
                fecha: "2021-10-01 12:00:00"
              },
              {
                contenido: "Respuesta de prueba",
                enviado: true,
                fecha: "2021-10-01 12:01:00"
              },
              {
                contenido: "Otro mensaje de prueba, este tiene un texto más largo para probar el efecto de desbordamiento, así que aquí va un poco más de texto",
                enviado: false,
                fecha: "2021-10-01 12:02:00"
              },
              {
                contenido: "Otra respuesta de prueba, también con un texto más largo para probar el scroll",
                enviado: true,
                fecha: "2021-10-01 12:03:00"
              },
              {
                contenido: "Ultimo mensaje de prueba",
                enviado: false,
                fecha: "2021-10-01 12:04:00"
              },
            ],
            clientes: [
              {
                id: 1,
                nombre: "Juan Pérez",
                ultimo_mensaje: "Hola",
                fecha_ultimo_mensaje: "2021-10-01 12:00:00"
              },
              {
                id: 2,
                nombre: "María González",
                ultimo_mensaje: "Hola, ¿cómo estás?",
                fecha_ultimo_mensaje: "2021-10-01 12:01:00"
              }
            ],
            clienteActual: null,
            usuario:{
              roles: [],
              esCliente: false,
              esEmpleado: false,
            }
        }
    },
  methods: {
    async enviarMensaje() {
      if (!this.mensajeActual) {
        return;
      }
      try {
          const respuesta = await ApiService.enviarMensaje(this.mensajeActual);
          if (respuesta.success){
            await this.obtenerMensajes(false, this.usuario.id);
          }
        } catch (error) {
          alertify.error('Error aal enviar el mensaje'+ error);
        }
    },
    // Cambiar entre la vista de clientes y mensajes
    cambiarComponente() {
      this.componenteMostrado = this.componenteMostrado === 1 ? 2 : 1;
    },

    // Actualizar el estado de pantalla grande en función del tamaño de la ventana
    actualizarPantallaGrande() {
      this.pantallaGrande = window.innerWidth > 768;
    },

    // Cambiar la versión de IA y obtener los mensajes nuevamente
    async cambiarVersion() {
      this.versionIA = !this.versionIA;
      try {
        await this.obtenerMensajes(this.versionIA, this.clienteActual?.id);
      } catch (error) {
        alertify.error('Error al cambiar la versión de IA');
      }
    },

    // Seleccionar un cliente y cargar los mensajes
    async seleccionarCliente(idCliente) {
      try {
        this.clienteActual = this.clientes.find((cliente) => cliente.id === idCliente);
        if (!this.clienteActual) {
          alertify.error('Cliente no encontrado');
          return;
        }
        await this.obtenerMensajes(false, this.usuario.id);
      } catch (error) {
        alertify.error('Error al seleccionar el cliente');
      }
    },

    // Obtener los clientes (para el empleado)
    async obtenerClientes() {
      if (this.usuario.esEmpleado) {
        try {
          const respuesta = await ApiService.obtenerClientes();
          this.clientes = respuesta;
          this.clientes.sort((a, b) => new Date(b.fecha_ultimo_mensaje) - new Date(a.fecha_ultimo_mensaje));
        } catch (error) {
          alertify.error('Error al obtener los clientes');
        }
      }
    },

    // Obtener los mensajes del cliente o IA
    async obtenerMensajes(versionIA, idCliente) {
      try {
        const respuesta = await ApiService.obtenerMensajes(versionIA, idCliente);
        this.mensajes = respuesta.mensajes;
      } catch (error) {
        alertify.error('Error al obtener los mensajes');
        console.error(error);
      }
    },
    moverAMensajesRecientes(){
      this.$refs.listaMensajes.scrollTop = this.$refs.listaMensajes.scrollHeight;
    }

    // Inicializar la pantalla al cargar
  },
  async mounted() {
    console.log("Hola mundo");
    try {
      this.usuario = useAuthStore().getUsuario();
      this.usuario.esEmpleado = this.usuario.roles.includes("Atención al cliente");
      this.usuario.esCliente = this.usuario.roles.includes("Cliente");
      if (this.usuario.esEmpleado) {
        //await this.obtenerClientes();
      }
      else if (this.usuario.esCliente) {
        await this.obtenerMensajes(false, this.usuario.id);
      }
      this.moverAMensajesRecientes();
      this.actualizarPantallaGrande();
      window.addEventListener("resize", this.actualizarPantallaGrande);
    } catch (error) {
      alertify.error('Error al inicializar la pantalla');
    }
  },
};
</script>