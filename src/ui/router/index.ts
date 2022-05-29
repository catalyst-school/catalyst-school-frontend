import { createRouter, createWebHistory } from 'vue-router';

// todo use enums for route names
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../admin/views/HomeView.vue'),
        },
        {
            path: '/topic-list',
            name: 'topic-list',
            component: () => import('../admin/views/TopicList.vue'),
        },
        {
            path: '/topic-builder/:id',
            name: 'topic-builder',
            component: () => import('../admin/views/TopicBuilder.vue'),
        },
        {
            path: '/theory-form',
            name: 'theory-form',
            component: () => import('../admin/components/TheoryForm.vue'),
        },
    ],
});

export default router;
