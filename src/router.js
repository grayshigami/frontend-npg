import { createRouter, createWebHistory } from "vue-router";

const isAuthenticated = () => {
    const token = localStorage.getItem('token');

    if (!token) return false;

    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const now = new Date().getTime();

    if (tokenExpiration && now > tokenExpiration) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        return false;
    }

    return true;
};

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
            component: () => import("@/components/registrar-incidencia.vue"),
            props: true
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
            component: () => import("@/components/editar-incidencia.vue"),
            props: true
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'login-component' && !isAuthenticated()) {
        next({name: 'login-component'})
    } else {
        next();
    }
});

export default router
