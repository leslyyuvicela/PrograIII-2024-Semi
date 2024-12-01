<template>
    <div>
    <CajaTexto type="text" v-model="busqueda" placeholder="Buscar..." />
    </div>
</template>

<style scoped>

</style>
<script>
import CajaTexto from './CajaTexto.vue';

export default {
  name: 'BusquedaComp',
  components: {
    CajaTexto,
  },
  props: {
    // Recibe la lista de elementos desde el componente padre
    items: {
      type: Array,
      required: true,
    },
    // Campos en los que se desea buscar (opcional)
    camposFiltrables: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      busqueda: "",
    };
  },
  methods: {
    buscar() {
      // Normaliza el término de búsqueda a minúsculas
      const termino = this.busqueda.toLowerCase().trim();

      // Se filtran los elementos que coincidan con el término de búsqueda en al menos un campo
      const resultados = this.items.filter(item => {
        // Si no se especifican campos busca en todas las propiedades del objeto
        if (this.camposFiltrables.length === 0) {
          return Object.values(item).some(value =>
            String(value).toLowerCase().includes(termino)
          );
        } else {
          // Busca solo en los campos especificados
          return this.camposFiltrables.some(campo =>
            String(item[campo]).toLowerCase().includes(termino)
          );
        }
      });

      // Se dan los resultados filtrados al componente padre
      this.$emit("resultados-busqueda", resultados);
    },
  },
  watch: {
    // Se ejecuta la búsqueda cada vez que cambia el término de búsqueda
    busqueda() {
      this.buscar();
    },
  },
};
</script>