import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/LogIn.vue";
import Principal from "../views/PaginaPrincipal.vue";
import RegistroUsuario from "../views/RegistroUsuario.vue";
import PaginaMenu from "../views/PaginaMenu.vue";
import PaginaCarrito from "@/views/PaginaCarrito.vue";
import PaginaPrueba from "@/views/PaginaPrueba.vue";
import PaginaProducto from "@/views/PaginaProducto.vue";
import PaginaCuenta from "@/views/PaginaCuenta.vue";
import PaginaDireccion from "../views/PaginaDireccion.vue";
import PaginaChat from "@/views/PaginaChat.vue";
const routes = [
    {
        path: "/",
        name: "Principal",
        component: Principal,
        meta: { title: "Good Burger" },
    },
    {
        path: "/registro",
        name: "Registro",
        component: RegistroUsuario,
        meta: { title: "Registro de usuario" },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/menu",
        name: "Menu",
        component: PaginaMenu,
    },
    {
        path: "/carrito",
        name: "Carrito",
        component: PaginaCarrito,
    },
    {
        path: "/pruebas",
        name: "Pruebas",
        component: PaginaPrueba,
    },

    {
        path: "/producto/:id",
        name: "Producto",
        component: PaginaProducto,
    },
    {
        path: "/cuenta",
        name: "Cuenta",
        component: PaginaCuenta,
    },
    {
        path: "/direccion/:accion/:id?",
        name: "Direccion",
        component: PaginaDireccion,
    },
    {
        path: "/chat",
        name: "Chat",
        component: PaginaChat,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), 
    routes,
});

export default router;