<script setup lang="ts">
import { Home, Crane } from '@vicons/tabler';
import { NIcon, type MenuOption, NMenu } from 'naive-ui';
import { type Component, h, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
    {
        label: () => h(RouterLink, { to: { name: 'home' } }, { default: () => 'Главная' }),
        key: 'home',
        icon: renderIcon(Home),
    },
    {
        label: () =>
            h(RouterLink, { to: { name: 'topic-list' } }, { default: () => 'Конструктор тем' }),
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
