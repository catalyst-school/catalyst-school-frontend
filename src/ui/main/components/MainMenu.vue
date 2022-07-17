<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { RouteNames } from '@/ui/router';
import { Home, Crane } from '@vicons/tabler';
import { NIcon, type MenuOption, NMenu, NButton, NSpace } from 'naive-ui';
import { type Component, h, ref, watch, nextTick } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
    {
        label: () => h(RouterLink, { to: { name: RouteNames.Main } }, { default: () => 'Главная' }),
        key: RouteNames.Main,
        icon: renderIcon(Home),
    },
    {
        label: () =>
            h(RouterLink, { to: { name: RouteNames.Admin } }, { default: () => 'Админ панель' }),
        key: 'topic-list',
        icon: renderIcon(Crane),
    },
];

const route = useRoute();
const activeKey = ref<string | null>(null);
watch(
    () => route.name,
    (name) => {
        activeKey.value = name as string;
    },
);

const logout = () => {
    authStore.logout();
    router.push({ name: RouteNames.Login });
    nextTick();
};
</script>

<template>
    <n-space align="center" justify="space-between">
        <NMenu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
        <n-button class="btn" round @click="logout()">выйти</n-button>
    </n-space>
</template>
<style>
.btn {
    margin-right: 40px;
}
</style>
