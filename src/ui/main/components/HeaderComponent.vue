<script setup lang="ts">
import { RouteNames } from '@/ui/router';
import { NMenu, NButton, type MenuOption } from 'naive-ui';
import { h, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const activeKey = ref<string | null>(null);

const menuOptions: MenuOption[] = [
    {
        label: () => h(RouterLink, { to: { name: RouteNames.Main } }, { default: () => 'ЦЕЛИ' }),
        key: RouteNames.Goals,
    },
    {
        label: () =>
            h(RouterLink, { to: { name: RouteNames.Main } }, { default: () => 'ТРЕНАЖЕРЫ' }),
        key: RouteNames.Main,
    },
    {
        label: () =>
            h(RouterLink, { to: { name: RouteNames.Main } }, { default: () => 'СТАТИСТИКА' }),
        key: RouteNames.Main,
    },
    {
        label: () =>
            h(RouterLink, { to: { name: RouteNames.Main } }, { default: () => 'ДОСТИЖЕНИЯ' }),
        key: RouteNames.Main,
    },
];

watch(
    () => route.name,
    (name) => {
        activeKey.value = name as string;
    },
);
</script>

<template>
    <div class="header">
        <div class="header__logo">
            <img src="../../../images/Logo.svg" alt="logo" />
        </div>
        <NMenu
            v-model:value="activeKey"
            class="header__menu"
            mode="horizontal"
            :options="menuOptions"
        />
        <n-button class="header__start" strong round type="warning">Начать</n-button>
    </div>
</template>

<style scoped lang="scss">
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 140px;
    font-size: 20px;

    &__logo {
        width: 350px;
    }
}
</style>
