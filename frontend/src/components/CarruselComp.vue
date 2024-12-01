<template>
<div class="carousel">
        <div class="carousel-slides" >
        <button class="prev" @click="prevSlide">{{ "<" }}</button>
        <div class="slide">
            <a :href="anuncios[currentSlide].url_redireccion">
                <img class="img-anuncio" :src="anuncios[currentSlide].url_foto" alt="Anuncio">
            </a>
        </div>
        <button class="next" @click="nextSlide">{{ ">" }}</button>
    </div>
</div>
</template>

<style scoped>
.carousel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.carousel-slides {
    width: 60%;
    height: 100%;
  display: flex;
  transition: fade 0.5s;
}
.slide, .img-anuncio,a{
  min-width: 100%;
  height: 100%;
}
.prev,
.next {
    width: 20%;
    height: 100%;
  background: none;
  color: #fff9;
  border: none;
  cursor: pointer;
  padding: 10px;
}
.prev :hover, .next :hover {
    background: #fff2;
    font-size: 2em;
    color: #fffb;
}


</style>
<script>
export default {
    
    name: 'CarruselComp',
    data (){
        return{
        currentSlide: 1,
        anuncios: [
            {
                id: 1,
                url_foto: "https://proyectodb.blob.core.windows.net/imgs/Burger_cheesebacon.jpeg",
                url_redireccion: "/menu?categoria=Burgers"
            },
            {
                id: 2,
                url_foto: "https://proyectodb.blob.core.windows.net/imgs/Limonada_fresa.jpeg",
                url_redireccion: "/menu?categoria=Bebidas"
            },
            {
                id: 3,
                url_foto: "https://proyectodb.blob.core.windows.net/imgs/Combo_estudiante.jpeg",
                url_redireccion: "/menu?categoria=Combos"
            },
            {
                id: 4,
                url_foto: "https://proyectodb.blob.core.windows.net/imgs/Nachos.jpeg",
                url_redireccion: "/menu?categoria=Snacks"
            }
        ],
        };
    },
    methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.anuncios.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.anuncios.length) % this.anuncios.length;
    },
    },
    mounted() {
        this.intervalo = setInterval(this.nextSlide, 5000);
    },
    beforeUnmount() {
        clearInterval(this.intervalo);
    }
};

</script>