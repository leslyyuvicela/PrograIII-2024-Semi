import {useAuthStore} from '@/stores/auth';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.msgError = "";
    }

    // Método para obtener el token del authStore
    obtenerToken() {
        const authStore = useAuthStore();
        return authStore.getToken();
    }
    
      // Método para cargar los datos del usuario, direcciones y roles
async cargarDatos() {
    const token = this.obtenerToken(); 
    try {
        
        const respuesta = await fetch(`${this.baseURL}/usuarios/cuenta/`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json",
            },
        });

        if (respuesta.ok) {
            const datos = await respuesta.json();


            return {
                error: false,
                datos: datos
            };
        }

        const datos = await respuesta.json();
        this.msgError = datos.mensaje || 'Error al obtener la cuenta';
        return { error: true, mensaje: this.msgError };

    } catch (error) {
        console.error("Error al obtener la cuenta:", error);
        this.msgError = error.message;
        return { error: true, mensaje: error.message };
    }
}

   // Método para actualizar los datos de la cuenta
async actualizarCuenta(datosCuenta) {
    const token = this.obtenerToken();  // Obtener el token
    try {
        const respuesta = await fetch(`${this.baseURL}/usuarios/cuenta/`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,  // Incluir el token en los encabezados
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosCuenta),
        });

        if (respuesta.ok) {
            const datos = await respuesta.json();
            return { error: false, datos: datos };
        }

        const datos = await respuesta.json();
        this.msgError = datos.mensaje || 'Error al actualizar la cuenta';
        return { error: true, mensaje: this.msgError };

    } catch (error) {
        console.error("Error al actualizar la cuenta:", error);
        this.msgError = error.message;
        return { error: true, mensaje: error.message };
    }
}
      
 // Método para marcar una dirección como predeterminada y actualizar la variable direcciones
async marcarPredeterminada(id) {
    const token = this.obtenerToken(); 
    try {
        
        const response = await fetch(`${this.baseURL}/usuarios/direcciones/predeterminada`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }), 
        });

        const data = await response.json();

        if (response.ok) {
            
            const direcciones = data.direcciones.map((direccion) => ({
                id: direccion.id,
                nombre: direccion.nombre,
                direccion: direccion.direccion,
                predeterminada: direccion.predeterminada,
            }));
            
            return {
                error: false,
                mensaje: "Dirección marcada como predeterminada",
                direcciones: direcciones 
            };
        }

        return { error: true, mensaje: data.mensaje || "Error al marcar como predeterminada." };

    } catch (error) {
        console.error("Error al marcar como predeterminada:", error);
        return { error: true, mensaje: error.message || "Error al marcar como predeterminada." };
    }
}

    // Método para insertar productos, categorías o anuncios
    async insertarEntidad(entidad, datosEntidad) {
        const token = this.obtenerToken();
        try {
            const formData = new FormData();

            // Añadir los datos de la entidad al FormData
            for (const clave in datosEntidad) {
                formData.append(clave, datosEntidad[clave]);
            }

            const respuesta = await fetch(`${this.baseURL}/${entidad}/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`, // Enviar token
                },
                body: formData, // Enviar el FormData que contiene los datos y la imagen
            });

            if (respuesta.ok) {
                const datos = await respuesta.json();
                return { error: false, datos: datos };
            }

            const datos = await respuesta.json();
            this.msgError = datos.mensaje || 'Error al insertar';
            return { error: true, mensaje: this.msgError };

        } catch (error) {
            console.error(`Error al insertar ${entidad}:`, error);
            this.msgError = error.message;
            return { error: true, mensaje: error.message };
        }
    }


    // Método para agregar un producto al carrito
    async agregarACarrito(datosCarrito) {
        const token = this.obtenerToken();
        try {
            const respuesta = await fetch(`${this.baseURL}/ventas/carrito/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Enviar token
                },
                body: JSON.stringify(datosCarrito),
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                return { error: false, datos: datos };
            }

            this.msgError = datos.mensaje || 'Error al agregar al carrito';
            return { error: true, mensaje: this.msgError };

        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            this.msgError = error.message;
            return { error: true, mensaje: error.message };
        }
    }


    // Método para actualizar productos, categorías o anuncios
    async actualizarEntidad(entidad, idEntidad, datosEntidad) {
        const token = this.obtenerToken();
        try {
            const formData = new FormData();

            // Añadir los datos de la entidad al FormData
            for (const clave in datosEntidad) {
                formData.append(clave, datosEntidad[clave]);
            }

            const respuesta = await fetch(`${this.baseURL}/${entidad}/${idEntidad}/`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`, // Enviar token
                },
                body: formData, // Enviar el FormData que contiene los datos y la imagen
            });

            if (respuesta.ok) {
                const datos = await respuesta.json();
                return { error: false, datos: datos };
            }

            const datos = await respuesta.json();
            this.msgError = datos.mensaje || 'Error al actualizar';
            return { error: true, mensaje: this.msgError };

        } catch (error) {
            console.error(`Error al actualizar ${entidad}:`, error);
            this.msgError = error.message;
            return { error: true, mensaje: error.message };
        }
    }

    // Método para eliminar productos, categorías o anuncios
    async eliminarEntidad(entidad, idEntidad) {
        const token = this.obtenerToken();
        try {
            const respuesta = await fetch(`${this.baseURL}/${entidad}/${idEntidad}/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`, // Enviar token
                },
            });

            if (respuesta.ok) {
                return { error: false, mensaje: `${entidad} eliminado correctamente` };
            }

            const datos = await respuesta.json();
            this.msgError = datos.mensaje || 'Error al eliminar';
            return { error: true, mensaje: this.msgError };

        } catch (error) {
            console.error(`Error al eliminar ${entidad}:`, error);
            this.msgError = error.message;
            return { error: true, mensaje: error.message };
        }
    }

    async registrarUsuario(datosUsuario) {
        try {
            const respuesta = await fetch(`${this.baseURL}/usuarios/registro/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datosUsuario),
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                return { error: false, datos: datos };
            }

            this.msgError = datos.mensaje || 'Error al registrar el usuario';
            return { error: true, mensaje: this.msgError };

        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            this.msgError = error.message;
            return { error: true, mensaje: error.message };
        }
    }

    async iniciarSesion(credenciales) {
        try {
            const respuesta = await fetch(`${this.baseURL}/usuarios/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credenciales),
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                // Guardar el token y redirigir
                const authStore = useAuthStore();
                authStore.setToken(datos.access);
                authStore.setUsuario(datos.usuario);
                window.location.href = '/'; // Redirigir a la página principal
                return { error: false, datos: datos };
            }

            this.msgError = datos.mensaje || 'Error al iniciar sesión';
            return { error: true, mensaje: this.msgError };

        } catch (error) {
            this.msgError = error.message;
            return { error: true, mensaje: error.message };
        }
    }

    cerrarSesion() {
        const authStore = useAuthStore();
        authStore.logout();
        window.location.href = '/';
    }
    async borrarCuenta() {
        try {
            const token = this.obtenerToken();
            const respuesta = await fetch(`${this.baseURL}/usuarios/cuenta/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            if (respuesta.ok) {
                this.cerrarSesion();
                return { error: false, mensaje: "Cuenta eliminada correctamente" };
            }
            return { error: true, mensaje: "Error al eliminar la cuenta" };
        }
        catch (error) {
            console.error("Error al eliminar la cuenta:", error);
            return { error: true, mensaje: error.message };
        }
                    
    }

    async obtenerProductos(categoria, filtro = "") {
        try {
            const queryParams = filtro ? `?categoria=${categoria}&filtro=${filtro}` : `?categoria=${categoria}`;
            const respuesta = await fetch(`${this.baseURL}/menu/productos/${queryParams}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                return { error: false, datos: datos };
            }

            this.msgError = datos.mensaje || 'Error al obtener productos';
            return { error: true, mensaje: this.msgError };

        } catch (error) {
            console.error("Error al obtener productos:", error);
            this.msgError = error.message;
            return { error: true, mensaje: error.message };
        }
    }
    async obtenerCategorias(){
        try {
            const respuesta = await fetch(`${this.baseURL}/menu/categorias/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                return { error: false, datos: datos };
            }

            this.msgError = datos.mensaje || 'Error al obtener productos';
            return { error: true, mensaje: this.msgError };

        } catch (error) {
            console.error("Error al obtener productos:", error);
            this.msgError = error.message;
            return { error: true, mensaje: error.message };
        }
    }
    async obtenerAnuncios(){
        try {
            const respuesta = await fetch(`${this.baseURL}/menu/productos/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            
            const datos = await respuesta.json();

            if (respuesta.ok) {
                return { error: false, datos: datos };
            }

            this.msgError = datos.mensaje || 'Error al obtener productos';
            return { error: true, mensaje: this.msgError };

        } catch (error) {
            console.error("Error al obtener productos:", error);
            this.msgError = error.message;
            return { error: true, mensaje: error.message };
        }
    }

    async obtenerElementos(tipo) {
        try {
          // Se construye la URL con el tipo
        const response = await fetch(`/api/${tipo}`);
        if (!response.ok) throw new Error("Error al obtener datos del servidor");
        
          // Se obtiene el JSON con los datos
        const data = await response.json();
        return data;
        } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
        }
    }
    // Método para realizar un pedido
    async realizarPedido(productos, tipoEntrega, idDireccion, metodoPago) {
        const token = this.obtenerToken();
        try {
            const respuesta = await fetch(`${this.baseURL}/ventas/pedidos/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productos: productos,
                    tipo_entrega: tipoEntrega,
                    id_direccion: idDireccion,
                    metodo_pago: metodoPago
                })
            });

            if (respuesta.ok) {
                return { error: false, datos: await respuesta.json() };
            }
            
            return { error: true, mensaje: (await respuesta.json()).mensaje || 'Error al realizar el pedido' };
        } catch (error) {
            return { error: true, mensaje: error.message };
        }
    }

    // Método para borrar productos seleccionados en el carrito
    async borrarProductos(ids) {
        const token = this.obtenerToken();
        try {
            const respuesta = await fetch(`${this.baseURL}/ventas/carrito/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ids })
            });
            
            if (respuesta.ok) {
                return { error: false, mensaje: "Productos eliminados correctamente" };
            }
            alertify.success('Eliminando productos del carrito');
            
            return { error: true, mensaje: (await respuesta.json()).mensaje || 'Error al eliminar productos' };
        } catch (error) {
            return { error: true, mensaje: error.message };
        }
    }

    // Método para sumar la cantidad de un producto en el carrito
    async sumarProducto(id, cantidad) {
        const token = this.obtenerToken();
        try {
            const respuesta = await fetch(`${this.baseURL}/ventas/carrito/`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productos: [{ id, cantidad: cantidad + 1 }]
                })
            });

            if (respuesta.ok) {
                return { error: false, datos: await respuesta.json() };
            }

            return { error: true, mensaje: (await respuesta.json()).mensaje || 'Error al sumar producto' };
        } catch (error) {
            return { error: true, mensaje: error.message };
        }
    }

    // Método para restar la cantidad de un producto en el carrito
    async restarProducto(id, cantidad) {
        const token = this.obtenerToken();
        try {
            const respuesta = await fetch(`${this.baseURL}/ventas/carrito/`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productos: [{ id, cantidad:cantidad -1 }]
                })
            });

            if (respuesta.ok) {
                return { error: false, datos: await respuesta.json() };
            }

            return { error: true, mensaje: (await respuesta.json()).mensaje || 'Error al restar producto' };
        } catch (error) {
            return { error: true, mensaje: error.message };
        }
    }

    // Método para obtener las direcciones del usuario
    async obtenerDirecciones() {
        const token = this.obtenerToken();
        try {
            const respuesta = await fetch(`${this.baseURL}/usuarios/direcciones/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (respuesta.ok) {
                return { error: false, datos: await respuesta.json() };
            }
            
            return { error: true, mensaje: (await respuesta.json()).mensaje || 'Error al obtener direcciones' };
        } catch (error) {
            return { error: true, mensaje: error.message };
        }
    }

    // Método para obtener el carrito del usuario
    async obtenerCarrito() {
        const token = this.obtenerToken();
        if (!token) {
            //redirigir a login 
            window.location.href = '/login';
        }
        try {
            const respuesta = await fetch(`${this.baseURL}/ventas/carrito/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (respuesta.ok) {
                return { error: false, datos: await respuesta.json() };
            }

            return { error: true, mensaje: (await respuesta.json()).mensaje || 'Error al obtener el carrito' };
        } catch (error) {
            return { error: true, mensaje: error.message };
        }
    }

    // Método para actualizar el carrito del usuario
    async actualizarCarrito(data) {
        const token = this.obtenerToken();
        try {
            const respuesta = await fetch(`${this.baseURL}/ventas/carrito/`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
                
            });

            if (respuesta.ok) {
                return { error: false, datos: await respuesta.json() };
            }

            return { error: true, mensaje: (await respuesta.json()).mensaje || 'Error al actualizar el carrito' };
        } catch (error) {
            return { error: true, mensaje: error.message };
        }
    }

    async obtenerProducto(idProducto) {
        try {
            const respuesta = await fetch(`${this.baseURL}/menu/producto/${idProducto}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                return { error: false, datos: datos };
            }

            this.msgError = datos.mensaje || 'Error al obtener producto';
            return { error: true, mensaje: this.msgError };

        } catch (error) {
            console.error("Error al obtener producto:", error);
            this.msgError = error.message;
            return { error: true, mensaje: error.message };
        }
    }

    // Método para guardar una dirección (POST o PUT según la acción)
    async guardarDireccion(direccion, accion, id = null) {
        let url = '';
        let metodo = '';

        if (accion === 'añadir') {
            url = `${this.baseURL}/usuarios/direccion/`;
            metodo = 'POST';
        } else if (accion === 'editar' && id) {
            url = `${this.baseURL}/usuarios/direccion/${id}/`;
            metodo = 'PUT';
        }

        try {
            const token = this.obtenerToken();
            const response = await fetch(url, {
                method: metodo,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                    },
                body: JSON.stringify(direccion),
            });

            if (!response.ok) {
                const errorData = await response.json();
                this.msgError = errorData.message || 'Error al guardar la dirección';
                throw new Error(this.msgError);
            }

            return await response.json();
        } catch (error) {
            console.error('Error en guardarDireccion:', error);
            throw error;
        }
    }

    // Método para cargar datos de una dirección (GET)
    async cargarDatosDireccion(id) {
        const url = `${this.baseURL}/usuarios/direcciones/${id}/`;

        try {
            const token = this.obtenerToken();
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                this.msgError = errorData.message || 'Error al cargar la dirección';
                throw new Error(this.msgError);
            }

            return await response.json();
        } catch (error) {
            console.error('Error en cargarDatos:', error);
            throw error;
        }
    }

    async obtenerClientes() {
        const token = this.obtenerToken();
        try {
            const response = await fetch(`${this.baseURL}/chat/clientes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
    
            if (!response.ok) {
                const error = await response.json();
                this.msgError = error.message || "Error al obtener clientes.";
                return { success: false, error: this.msgError };
            }
    
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            this.msgError = "Error de conexión al obtener clientes.";
            return { success: false, error: this.msgError };
        }
    }
    
    async obtenerMensajes(versionIA, idCliente = null) {
        const token = this.obtenerToken();
        console.log("Obteniendo mensajes...");
        const url = `${this.baseURL}/chat/mensajes?version_ia=${versionIA}&id_cliente=${idCliente}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                const error = await response.json();
                console.log("Error al obtener mensajes: ", error);
                this.msgError = error.message || "Error al obtener mensajes.";
                return { success: false, error: this.msgError };
            }
    
            const data = await response.json();
            // Convertir fechas de mensajes a objetos Date con el formato dd/MM/yyyy HH:mm, luego ordenarlos por fecha (primero los mas antiguos)
            data.mensajes.forEach(mensaje => {
                mensaje.fecha = new Date(mensaje.fecha);
                mensaje.fecha = mensaje.fecha.toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" });
            });
            data.mensajes.sort((a, b) => a.fecha - b.fecha);
            return { success: true, mensajes: data.mensajes || [] };
        } catch (error) {
            this.msgError = "Error de conexión al obtener mensajes.";
            console.log("Error al obtener mensajes:", error);
            return { success: false, error: this.msgError };
        }
    }  
    async enviarMensaje(mensaje){
        const token = this.obtenerToken();
        const usuario = useAuthStore().getUsuario();
        const url = `${this.baseURL}/chat/mensajes`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    contenido: mensaje,
                    id_cliente: usuario.id
                })
            });
            if (response.ok) {
                return { success: true };
            }
            const error = await response.json();
            this.msgError = error.message || "Error al enviar mensaje.";
            console.log("Error al enviar mensaje: ", error);
            return { success: false, error: this.msgError };
        }
        catch (error) {
            this.msgError = "Error de conexión al enviar mensaje.";
            console.log("Error al enviar mensaje:", error);
            return { success: false, error: this.msgError };
        }
    }
}

// Exportar una instancia de la clase con la URL base
export default new ApiService("http://127.0.0.1:8000");

