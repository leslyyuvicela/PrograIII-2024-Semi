<template class = "pagina">
    <div class="container">
        <div class="logo">
            <img src="../../public/imagenes/logo_color.png" alt="Good Burguer Logo" />
        </div>
        <form class="register-form" @submit.prevent>
            <CajaTexto 
            placeholder="Nombres"
            type="text"
            v-model="form.nombre"
            :invalido="this.errores.nombre"
            :msg_error="this.errores.nombre"
            />

            <CajaTexto
            placeholder="Apellidos"
            type="text"
            v-model="form.apellido"
            :invalido="this.errores.apellido"
            :msg_error="this.errores.apellido"
            />

            <CajaTexto
            class="mitad-ancho"
            placeholder="Telefono"
            type="tel"
            v-model="form.telefono"
            :invalido="this.errores.telefono"
            :msg_error="this.errores.telefono"
            />

            <CajaTexto
            placeholder="Correo Electronico"
            type="email"
            v-model="form.correo"
            :invalido="this.errores.correo"
            :msg_error="this.errores.correo"
            />

            <CajaTexto
            placeholder="Contraseña"
            type="password"
            v-model="form.contraseña"
            :invalido="this.errores.contraseña"
            :msg_error="this.errores.contraseña"
            />

            <CajaTexto 
            placeholder="Confirmar Contraseña"
            type="password"
            v-model="form.confirmar_contraseña"
            :invalido="this.errores.confirmar_contraseña"
            :msg_error="this.errores.confirmar_contraseña"
            />
          <p style="color: red;">{{ msgError }}</p>
            <BotonComp @metodo_click="registrarUsuario">Registrar</BotonComp>
        </form>
    </div>
</template>

<style scoped>
.pagina{
    background-color: #000;
    padding: 0;
}

.mitad-ancho{
    width: 50%;
}

.container{
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #000;
    flex-direction: column;
    text-align: center;
}

.logo img{
    width: 150px;
    margin-bottom: 20px;
}

.register-form{
    width: 50%;
    min-width: 300px;
    max-width: 800px;
    background-color: #000;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
}
</style>

<!-- C U I D A D I T O -->

<script>
import CajaTexto from "@/components/CajaTexto.vue";
import BotonComp from "@/components/BotonComp.vue";
import ApiService from '@/services/ApiService';
import alertify from "alertifyjs";
import 'alertifyjs/build/css/alertify.css';
export default {
    name: 'RegistroUsuario',
    components: {
        CajaTexto,
        BotonComp
    },
    data() {
        return {
            form: {
                nombre: "",
                apellido: "",
                telefono: "",
                correo: "",
                contraseña: "",
                confirmar_contraseña: "",
            },
            errores: {},
            msgError: '',
        };
    },
    methods: {
        async registrarUsuario() {
            this.errores = {}; // Limpiar errores previos
            if (this.validarFormulario()) {
                try {
                    const response = await ApiService.registrarUsuario(this.form);

                    if (!response.error) {
                        // Usuario registrado con éxito, ahora intentamos iniciar sesión
                        const respuestaLogin = await ApiService.iniciarSesion({
                            correo: this.form.correo,
                            password: this.form.contraseña,
                        });

                        if (respuestaLogin.error) {
                            this.msgError = respuestaLogin.mensaje; 
                        }
                    } else {
                        this.msgError = response.mensaje;
                    }
                } catch (error) {
                    this.msgError = error.message; 
                    console.error('Error en el registro o login:', error);
                }
            } else {
                alertify.error(Object.values(this.errores).join('\n'));
            }
        },

        validarFormulario() {
            let esValido = true;
            const camposRequeridos = [
                "nombre",
                "apellido",
                "telefono",
                "correo",
                "contraseña",
                "confirmar_contraseña",
            ];

            camposRequeridos.forEach((campo) => {
                if (typeof this.form[campo] === 'string' && this.form[campo].trim().length === 0) {
                    this.errores[campo] = `El campo "${this.capitalizarNombreCampo(campo)}" es obligatorio.`;
                    esValido = false;
                }
            });

            // Validaciones específicas
            if (this.form.nombre.length < 3 || this.form.nombre.length > 50) {
                this.errores.nombres = "El nombre debe tener entre 3 y 50 caracteres.";
                esValido = false;
            }
            if (this.form.apellido.length < 3 || this.form.apellido.length > 50) {
                this.errores.apellidos = "El apellido debe tener entre 3 y 50 caracteres.";
                esValido = false;
            }
            if (!this.validarTelefono(this.form.telefono)) {
                this.errores.telefono = "El teléfono debe tener el formato 0000-0000.";
                esValido = false;
            }
            if (!this.validarCorreo(this.form.correo)) {
                this.errores.correo = "El correo electrónico no es válido.";
                esValido = false;
            }
            if (!this.validarContraseña(this.form.contraseña)) {
                this.errores.contraseña = "La contraseña debe tener entre 6 y 50 caracteres, con al menos una mayúscula, una minúscula y un número.";
                esValido = false;
            }
            if (this.form.contraseña !== this.form.confirmar_contraseña) {
                this.errores.confirmar_contraseña = "Las contraseñas no coinciden.";
                esValido = false;
            }

            return esValido;
        },
        capitalizarNombreCampo(nombreCampo) {
            return nombreCampo.charAt(0).toUpperCase() + nombreCampo.slice(1);
        },
        validarCorreo(correo) {
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(correo);
        },
        validarTelefono(telefono) {
            const re = /^\d{4}-\d{4}$/;
            return re.test(telefono);
        },
        validarContraseña(contraseña) {
            const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,50}$/;
            return re.test(contraseña);
        },
    },
};
</script>