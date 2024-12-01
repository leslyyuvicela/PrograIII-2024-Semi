import { defineStore } from "pinia";

export const useAuthStore = 
defineStore('auth',{
    state: () => ({
        token: null,
        usuario: null,
}),
actions: {
    setToken(token){
        this.token = token;
        localStorage.setItem('token', token);
    },
    getToken(){
        this.cargarDatos();
        return this.token;
        },
    setUsuario(usuario){
        
        this.usuario = usuario;
        localStorage.setItem('usuario', JSON.stringify(usuario));
    },
    getUsuario(){
        this.cargarDatos();
        return this.usuario;
    },
    logout(){
        this.token = null;
        this.usuario = null;
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        },
    cargarDatos(){
        const token = localStorage.getItem('token');
        const usuario =JSON.parse(localStorage.getItem('usuario'));
        if(token){
            this.token = token;
        }
        if(usuario){
            this.usuario = usuario;
        }
    }
    }
});