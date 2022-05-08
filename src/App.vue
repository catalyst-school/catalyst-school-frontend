<script lang="ts" setup>
import type { MenuOption } from 'naive-ui';
import { NIcon, NMenu } from 'naive-ui';
import type { Component } from 'vue';
import { h, ref, watch } from 'vue';
import { RouterLink, useRoute, RouterView } from 'vue-router';
import { Crane, Home } from '@vicons/tabler';

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
            h(RouterLink, { to: { name: 'theme-builder' } }, { default: () => 'Конструктор тем' }),
        key: 'theme-builder',
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

    <main>
        <RouterView />
    </main>
</template>

<style lang="scss" scoped>
main {
    padding: 16px;
}
</style>
