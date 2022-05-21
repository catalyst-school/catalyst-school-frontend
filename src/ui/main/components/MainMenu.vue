<script setup lang="ts">
import { RouteNames } from '@/ui/router';
import { Home, Crane } from '@vicons/tabler';
import { NIcon, type MenuOption, NMenu } from 'naive-ui';
import { type Component, h, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

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
</script>

<template>
    <NMenu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
</template>
