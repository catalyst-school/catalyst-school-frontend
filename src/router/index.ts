import { createRouter, createWebHistory } from 'vue-router';

// todo use enums
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
        },
        {
            path: '/theme-builder',
            name: 'theme-builder',
            component: () => import('../views/ThemeBuilder.vue'),
        },
    ],
});

export default router;
