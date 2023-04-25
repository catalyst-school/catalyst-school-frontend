import { useUserStore } from '@/stores/UserStore';
import { createRouter, createWebHistory } from 'vue-router';
export enum RouteNames {
    Main = 'main',
    Home = 'home',
    Admin = 'admin',
    AdminTopicList = 'admin-topic-list',
    AdminTopicBuilder = 'admin-topic-builder',
    CreateTheoryForm = 'admin-create-theory-form',
    UpdateTheoryForm = 'admin-update-theory-form',
    AdminGoalList = 'admin-goal-list',
    AdminGoalBuilder = 'admin-goal-builder',
    Login = 'login',
    EmailConfirmation = 'email-confirmation',
    ResetPassword = 'reset-password',
    TopicSession = 'topic-session',
    Goals = 'goals',
    AchievementList = 'achievement-list',
    AchievementBuilder = 'achievement-builder',
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: RouteNames.Main,
            component: () => import('../main/views/MainView.vue'),
            children: [
                {
                    path: '',
                    name: RouteNames.Home,
                    component: () => import('../main/views/HomeView.vue'),
                },
                {
                    path: '/goals',
                    name: RouteNames.Goals,
                    component: () => import('../main/views/GoalsView.vue'),
                },
                {
                    path: 'topic-session/:id',
                    name: RouteNames.TopicSession,
                    component: () => import('../main/views/TopicSession.vue'),
                },
            ],
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
                    path: 'topic-list/:id',
                    name: RouteNames.AdminTopicBuilder,
                    component: () => import('../admin/views/TopicBuilder.vue'),
                },
                {
                    path: 'goal-list',
                    name: RouteNames.AdminGoalList,
                    component: () => import('../admin/views/GoalList.vue'),
                },
                {
                    path: 'goal-list/:id',
                    name: RouteNames.AdminGoalBuilder,
                    component: () => import('../admin/views/GoalBuilder.vue'),
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
                {
                    path: 'achievement-list',
                    name: RouteNames.AchievementList,
                    component: () => import('../admin/views/AchievementList.vue'),
                },
                {
                    path: 'achievement-list/:id',
                    name: RouteNames.AchievementBuilder,
                    component: () => import('../admin/views/AchievementBuilder.vue'),
                },
            ],
        },
        {
            path: '/email-confirmation',
            name: RouteNames.EmailConfirmation,
            component: () => import('../shared/views/EmailConfirmation.vue'),
        },
        {
            path: '/reset-password',
            name: RouteNames.ResetPassword,
            component: () => import('../shared/views/ResetPassword.vue'),
        },
        {
            path: '/login',
            name: RouteNames.Login,
            component: () => import('../shared/views/LoginView.vue'),
        },
    ],
});
// router.beforeEach(async(from) => {
//    const userStore =  useUserStore();
//
//     if (userStore.currentUser || from.name === RouteNames.Login) {
//         return true;
//     }
//
//     try {
//         const user = await userStore.getProfile();
//
//         return user ? true : { name: RouteNames.Login };
//     } catch (error) {
//         return false;
//     }
// });

export default router;
