<template>
    <div class="category">
      <h3>{{ categoria.nombre }}</h3>
      <img :src="categoria.url_foto" :alt="categoria.nombre" class="category-image" />
    </div>
</template>

<script>

export default {
  name: 'CategoriaComp',
  data() {
    return {

    };
  },
  props: {
     categoria: {
      type: Object,
      required: true
    }
  },
};
</script>

<style scoped>
*{
  font-family: 'Arial Black';
  color: white;
  font-size: 20px;
}
  .category{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 10px;
    padding: 20px;
    background-color: #fff4;
  }
  .category-image{
    width: 150px;
    height: 150px;
    border-radius: 10px;
  }
</style>