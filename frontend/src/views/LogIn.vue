<template>
    <div class="login-container">

          <img src="imagenes/imagen de good burger.jpg" alt="imagenes" width="200px">

      <div class="form-wrapper"> 
        <h2>Iniciar sesión</h2>
        <form @submit.prevent="handleSubmit">
          <CajaTexto
            class="caja-texto"
            v-model="usuario.correo"
            placeholder="Correo Electrónico"
            type="email"
            required
          />
          <CajaTexto
            class="caja-texto"
            v-model="usuario.password"
            placeholder="Contraseña"
            type="password"
            required
          />
            <div class="form-header">
            <span>¿Olvidaste tu contraseña?</span>
          </div>
           

          
          <BotonComp @metodo_click="iniciar_sesion">Iniciar sesión</BotonComp>
          
          <div class="form-divider">
            <span>¿No tienes una cuenta?</span>
          </div>
          <BotonComp @metodo_click="registrarse">Registrarse</BotonComp>

        </form>
      </div>
    </div>
  </template>

<style scoped>

    *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
    text-decoration: none;
    text-transform: capitalize;
    padding: 20;
    box-sizing: border-box;
    
}


.container{
    text-align: center;

}

form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
}


.form-wrapper{
    margin: auto;
    margin-top: 40px;
    position: absolute;
    left: 50%;
    top: 56%;
    border-radius: 4px;
    padding: 20px;
    width: 600px;
    transform: translate(-50%,-50%);
    background: rgb(0, 0, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.form-wrapper h2{
    color: #ffffff;
    margin-bottom: 20px;
    text-align: center;
}

.form-wrapper form  {
    margin: 25px 0 65px;
}


.form-wrapper :where(label, p, small, a){
    font-size: 0.92rem;
    color: #fcfcfc;
}


 .form-divider{
  display: block;
  position: relative;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  color: #ffffff;

 }

.form-container {
    display: inline-flex;
    position: relative;
    color: #ffffff;
   
}

.form-divider::after,
.form-divider::before{
    content: "";
    position: absolute;
    width: 300px;
    height: 3px;
    background-color: currentColor; 
   top: 0.7rem
}

.form-divider::before{
    left: -129px;
    }
  
.form-divider::after{
    right: -129px;
}

.form-divider::before
.form-divider::after{
    content: "";
    flex: 1;
    background-color: rgb(254, 254, 254);
    margin: 0 1px;
}

.form-divider span{
    padding: 0 190px;
    font-size: 0.92rem;
    color: rgb(255, 253, 253);

}

.form-header{
  color: #0597ff;


}

.caja-texto{
    width: 40vw;
    max-width: 600px;
}
img{
    width: 200px;
    margin-bottom: 40px;
    margin: 40px 0;
    

}
</style>

<!-- C U I D A D I T O -->

<script>
import BotonComp from '@/components/BotonComp.vue';
import CajaTexto from '@/components/CajaTexto.vue';
import ApiService from '@/services/ApiService';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
export default {
    name: 'LogIn',
    components: {
        BotonComp,
        CajaTexto
    },
    data(){
    return{
        usuario:{
        correo: '',
        password: ''
      }
  }
},
  methods: {
    async iniciar_sesion() {
      try {
        const response = await ApiService.iniciarSesion(this.usuario);
        
        if (!response.error) {
          this.datos_validos = true;
          // Aquí podrías redirigir al usuario a otra página
          this.$router.push('/');
        } else {
          alertify.error("Usuario o contraseña incorrectos");
        }
      } catch (error) {
        // Manejo de error de red u otro tipo de fallo
        this.mensaje_error = 'Hubo un problema al conectar con el servidor';
        this.datos_validos = false;
        alertify.error(this.mensaje_error+': ' + error);
      }
    },
    registrarse() {
      //Redireccionar a la página de RegistroUsuario
      this.$router.push('/registro');
    }
  },
    props: {
        
    },
    computed:{   
    },

}
</script>