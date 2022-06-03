import { createRouter, createWebHistory } from 'vue-router';
export enum RouteNames {
    Main = 'main',
    Admin = 'admin',
    AdminTopicList = 'admin-topic-list',
    AdminTopicBuilder = 'admin-topic-builder',
    CreateTheoryForm = 'admin-create-theory-form',
    UpdateTheoryForm = 'admin-update-theory-form',
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: RouteNames.Main,
            component: () => import('../main/views/MainView.vue'),
        },
        {
            path: '/admin',
            name: RouteNames.Admin,
            component: () => import('../admin/views/AdminView.vue'),
            children: [
                {
                    path: 'topic-list',
                    name: RouteNames.AdminTopicList,
                    component: () => import('../admin/views/TopicList.vue'),
                },
                {
                    path: 'topic-builder/:id',
                    name: RouteNames.AdminTopicBuilder,
                    component: () => import('../admin/views/TopicBuilder.vue'),
                },
                {
                    path: 'theory',
                    name: RouteNames.CreateTheoryForm,
                    component: () => import('../admin/views/CreateTheory.vue'),
                },
                {
                    path: 'theory/:id',
                    name: RouteNames.UpdateTheoryForm,
                    component: () => import('../admin/views/UpdateTheory.vue'),
                },
            ],
        },
    ],
});

export default router;
