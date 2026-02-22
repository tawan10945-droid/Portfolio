import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('./views/PortfolioHome.vue'),
    },
    {
        path: '/admin',
        component: () => import('./views/AdminLogin.vue'),
    },
    {
        path: '/admin/dashboard',
        component: () => import('./views/AdminDashboard.vue'),
        beforeEnter: (to, from, next) => {
            if (sessionStorage.getItem('admin_auth') === 'true') {
                next()
            } else {
                next('/admin')
            }
        },
    },
]

export default createRouter({
    history: createWebHashHistory('/Portfolio/'),
    routes,
    scrollBehavior(to) {
        if (to.hash) return { el: to.hash, behavior: 'smooth' }
        return { top: 0 }
    },
})
