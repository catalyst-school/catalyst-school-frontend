import { createRouter, createWebHistory } from 'vue-router';

// todo use enums for route names
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
        },
        {
            path: '/topic-list',
            name: 'topic-list',
            component: () => import('../views/TopicList.vue'),
        },
        {
            path: '/topic-builder/:id',
            name: 'topic-builder',
            component: () => import('../views/TopicBuilder.vue'),
        },
    ],
});

export default router;
