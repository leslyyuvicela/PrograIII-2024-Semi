<template>
  <BarraMenu class="sticky-top header" opcionSeleccionada="Inicio" />
    <div class = "container-fluid">
        <div class = "row carrusel">
            <CarruselComp />
        </div>
        <div class = "row lista-categorias">
            <div class = "col-3" v-for="categoria in categorias" :key="categoria.id"
            @click="abrirMenu(categoria.nombre)"
            >
                <CategoriaComp class="categoria" :categoria="categoria"/>
            </div>
        </div>
    </div>
    <div class = "footer">
      <h3>¡Disfruta de una buena Burger!</h3>
    <div class="footer-content">
      <div class="horarios">
        <h4>Horarios de Atención:</h4>
        <p>Lunes a viernes: 12:00 PM - 10:00 PM</p>
        <p>Sábado y domingo: 1:00 PM - 11:00 PM</p>
      </div>
      <div class="linea-vertical"></div>
      <div class="filosofia">
        <h4>Nuestra Filosofía:</h4>
        <p><strong>Misión:</strong> Brindar las mejores hamburguesas artesanales con ingredientes frescos y un ambiente acogedor.</p>
        <p><strong>Visión:</strong> Convertirnos en el restaurante favorito de la comunidad local.</p>
      </div>
    </div>
    <div class="footer-note">
      <h4>© 2024 Good Burger</h4>
      <p>
        Muchas promociones descritas y ofrecidas en este Sitio Web son exclusivamente para la compra en línea.<br>
        Para pedidos pagados con tarjeta de crédito, el dueño de la tarjeta deberá estar presente al momento de recibir el pedido y presentar su tarjeta de crédito y DUI.<br>
        Good Burger jamás enviará correos pidiendo tarjetas de crédito y claves.
      </p>
      <div class="social-media">
    <h4>Síguenos</h4>
    <div class="icons">
      <button class="icon "><i class="bi bi-instagram"></i></button>
      <button class="icon"><i class="bi bi-facebook"></i></button>
      <button class="icon"><i class="bi bi-tiktok"></i></button>
    </div>
    </div>
    </div>
  </div>
</template>
 
<style scoped>
.header{
  width: 100vw;

}
.carrusel{
  margin:10px auto;
  width: 60vw;
  height: 20vw;
}
.lista-categorias{
  margin:20px auto;
}
.categoria{
  margin:10px;
  cursor: pointer;
  transition: 0.5s;
}
.categoria:hover{
  transform: scale(1.1);
  transition: 0.5s;
}
.container-fluid{
  height: 100vh;
}
.footer{
  height: 70vh;
  background-color: #fff2;
  padding: 100px;
}

.footer h3 {
  color: #ffad00;
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: -30px;
}
.horarios {
  margin-right: auto;
  text-align: right;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
 margin-bottom: 10px;
  gap: 30px;
}

.horarios, .filosofia {
  flex: 1;
}

.linea-vertical {
  width: 1px;
  background-color: #fafafa;
  height: 130px;
  align-self: stretch;
  margin: 0 10px;
}
.horarios h4, .filosofia h4 {
  color: #ffad00;
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
}

.footer-note {
  font-size: 14px;
  line-height: 1.5;
  border-top: 1px solid #e9e9e9;
  padding-top: 10px;
}

.footer-note h4 {
  color: #ffad00;
  font-size: 18px;
  margin-bottom: 10px;
}

.footer-note p:last-child {
  color: #969696;
  font-weight: bold;
  margin-top: 10px;
}

.footer p{
  color: white;
}

.social-media {
  text-align: left;
  margin-top: 20px;
}

.social-media h4 {
  color: #ffad00;
  font-size: 16px;
  margin-bottom: 10px;
}

.icons {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
}
.icons button {
  background: none;
  border: none;
  cursor: pointer;
}
.icon {
  width: 50px;
  height: 50px;
  background:none;
  color:#e9e9e9;
}
</style>

<!--C U I D A D I T O-->

<script>
 
import ApiService from '@/services/ApiService'; 
import BarraMenu from '@/components/BarraMenu.vue';
import CategoriaComp from "@/components/CategoriaComp.vue";
import CarruselComp from '@/components/CarruselComp.vue';
  
  export default {
    data() {
      return {
        categorias: [{
            id: 1,
            nombre: 'burgers',
            imagen: 'https://th.bing.com/th/id/R.c691ed37c9ce3040c3ebd2892e88870c?rik=QUBcFflN%2b9oqPQ&pid=ImgRaw&r=0'
        },
        {
            id: 2,
            nombre: 'snacks',
            imagen: 'img/image2.png'
        },
        {
            id: 3,
            nombre: 'bebidas',
            imagen: 'img/image3.png'
        },
        {
            id: 4,
            nombre: 'combos',
            imagen: 'img/image4.png'
        },
        {
            id: 5,
            nombre: 'promociones',
            imagen: 'img/image5.png'
        }
    ],  
      };
    },
    components: {
      BarraMenu,
      CategoriaComp,
      CarruselComp,
    },
    methods: {
      async cargarDatos() {
        try {

          let respuesta = await ApiService.obtenerCategorias();
          this.categorias = respuesta.datos;
        } catch (error) {
          console.error('Error al cargar los datos:', error);
        }
      },
        abrirMenu(categ) {
          window.location.href = '/menu?categoria=' + categ;
        }
    },
    mounted() {
      this.cargarDatos();
    }
  };
  </script>
  