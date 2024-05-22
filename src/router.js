import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login-component',
            name: 'login-component',
            component: () => import("@/components/login.vue")
        },
        {
            path: '/',
            redirect: 'login-component'
        },
        {
            path: '/registrar-incidencia',
            name: 'registrar-incidencia',
            component: () => import("@/components/registrar-incidencia.vue")
        },
        {
            path: '/crear-usuario',
            name: 'crear-usuario',
            component: () => import("@/components/crear-usuario.vue")
        },
        {
            path: '/editar-usuario',
            name: 'editar-usuario',
            component: () => import("@/components/editar-usuario.vue")
        },
        {
            path: '/pantalla-usuario',
            name: 'pantalla-usuario',
            component: () => import("@/components/pantalla-usuario.vue")
        },
        {
            path: '/pantalla-administrador',
            name: 'pantalla-administrador',
            component: () => import("@/components/pantalla-administrador.vue")
        },
        {
            path: '/lista-usuarios',
            name: 'lista-usuarios',
            component: () => import("@/components/lista-usuarios.vue")
        },
        {
            path: '/editar-incidencia',
            name: 'editar-incidencia',
            component: () => import("@/components/editar-incidencia.vue")
        }
    ]
})

export default router
