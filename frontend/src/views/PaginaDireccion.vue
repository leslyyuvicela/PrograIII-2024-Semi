<template>
    <div class="map-container">
      <h2>{{ accion }} Dirección</h2>
      <l-map
        :zoom="zoom"
        :center="centro"
        style="height: 400px; width: 100%;"
        @click="clickMapa"
      >
        <l-tile-layer
          :url="tileLayerUrl"
          :attribution="attribution"
        ></l-tile-layer>
        <l-marker
          v-if="posicionMarca"
          :lat-lng="posicionMarca"
          :draggable="true"
          @moveend="marcaMovida"
        ></l-marker>
      </l-map>

      <div class="form-group">
      <CajaTexto
      placeholder="Nombre de la direccion"
      type="text"
      v-model="nombre"
      required
      />

      <CajaTexto
      placeholder="Direccion"
      type="text"
      v-model="direccion"
      required
      />

      <CajaTexto
      placeholder="Indicaciones adicionales"
      type="text"
      v-model="indicaciones"
      required
      />
    </div>

      
      <div class="button-group">
      <BotonComp class="boton-ancho" @metodo_click="guardarDireccion">Guardar</BotonComp>
      <BotonComp class="boton-ancho" @metodo_click="cancelar">Cancelar</BotonComp>
    </div>
      
    </div>
  </template>

<style>
.map-container {
  width: 70vw;
  height: 70vh;
  margin: 10vh auto;
}

.map-container h2 {
    color: #ffffff;
    margin-bottom: 20px;
    text-align: center;
}

.form-group {
    background-color: #000;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
}


.button-group {
  display: flex;
  justify-content: center;
  gap: 15px; 
  margin-top: 20px;
  padding-bottom: 40px;
}

.boton-ancho {
  width: 150px;
}
</style>


  
<script>
import { LMap, LTileLayer, LMarker } from "vue3-leaflet";
import "leaflet/dist/leaflet.css";
import CajaTexto from "@/components/CajaTexto.vue";
import BotonComp from "@/components/BotonComp.vue";
import ApiService from "@/services/ApiService"; 
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { useRoute } from 'vue-router'

export default {
  name: "PaginaDireccion",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    CajaTexto,
    BotonComp,
  },
  data() {
    return {
      zoom: 19,
      centro: [13.346994, -88.437800], // Coordenadas iniciales, Good Burger
      posicionMarca: null, // Posición del marcador
      lat: null, 
      lon: null, 
      tileLayerUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      nombre: "",
      direccion: "",
      indicaciones: "", // ID de la dirección si se está editando
    };
  },
  methods: {
    // Método que se llama al cargar la página
    async cargarDatos() {
      if (this.accion === "editar" && this.id) {
        try {
          const direccionData = await ApiService.cargarDatosDireccion(this.id);
          this.nombre = direccionData.nombre;
          this.direccion = direccionData.direccion;
          this.indicaciones = direccionData.indicaciones || "";
          this.lat = direccionData.lat;
          this.lon = direccionData.lon;
          this.posicionMarca = [this.lat, this.lon]; // Actualiza la posición del marcador
          this.centro = this.posicionMarca; // Centra el mapa en la dirección cargada
        } catch (error) {
          alertify.error("Error al cargar los datos de la dirección.");
        }
      }
    },

    // Método que se llama al hacer clic en el mapa
    async clickMapa(event) {
      this.posicionMarca = event.latlng;
      this.lat = event.latlng.lat;
      this.lon = event.latlng.lng;
      await this.obtenerDireccionMarcada(this.lat, this.lon);
    },

    // Método que se llama cuando el marcador es movido
    async marcaMovida(event) {
      this.posicionMarca = event.target.getLatLng();
      this.lat = this.posicionMarca.lat;
      this.lon = this.posicionMarca.lng;
      await this.obtenerDireccionMarcada(this.lat, this.lon);
    },

    // Método para obtener la dirección basada en las coordenadas
    async obtenerDireccionMarcada(lat, lng) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await response.json();
        this.direccion = data.display_name || "Dirección no disponible";
      } catch (error) {
        alertify.error("Error al obtener la dirección.");
      }
    },

    // Método para guardar la dirección
    async guardarDireccion() {
      // Validación de los campos
      if (!this.nombre || !this.direccion || !this.lat || !this.lon) {
        alertify.error("Todos los campos son obligatorios.");
        return;
      }

      const direccionData = {
        nombre: this.nombre,
        direccion: this.direccion,
        lat: this.lat, 
        lon: this.lon,
        indicaciones: this.indicaciones,
      };

      try {
        await ApiService.guardarDireccion(direccionData, this.accion, this.id);
        alertify.success("Dirección guardada con éxito.");
        this.$router.go(-1);
        
      } catch (error) {
        alertify.error("Error al guardar la dirección.");
      }
    },

    // Método para cancelar (redirige a la página de cuenta sin hacer cambios)
    cancelar() {
      this.$router.push({ name: "paginaCuenta" });
    },
  },
  // Llamamos a cargarDatos cuando se carga la vista
  mounted() {
    this.cargarDatos();
  },
  setup() {
    const route = useRoute()
    const id = route.params.id
    const accion = route.params.accion

    return { id, accion }
  }
};
</script>
