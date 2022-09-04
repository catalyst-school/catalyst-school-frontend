<script setup lang="ts">
import { RouteNames } from '@/ui/router';
import { NIcon, NMenu, type MenuOption } from 'naive-ui';
import { Crane, Home } from '@vicons/tabler';
import { h, ref, watch, type Component } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import AuthButtons from '../../shared/components/AuthButtons.vue';

const route = useRoute();
const router = useRouter();
const activeKey = ref<string | null>(null);

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
    {
        label: () => h(RouterLink, { to: { name: RouteNames.Home } }, { default: () => 'ГЛАВНАЯ' }),
        key: RouteNames.Home,
        icon: renderIcon(Home),
    },
    {
        label: () => h(RouterLink, { to: { name: RouteNames.Goals } }, { default: () => 'ЦЕЛИ' }),
        key: RouteNames.Goals,
    },
    {
        label: () =>
            h(RouterLink, { to: { name: RouteNames.Admin } }, { default: () => 'АДМИН ПАНЕЛЬ' }),
        key: 'topic-list',
        icon: renderIcon(Crane),
    },
];

const navigateToHome = () => {
    router.push({ name: RouteNames.Home });
};

watch(
    () => route.name,
    (name) => {
        activeKey.value = name as string;
    },
);
</script>

<template>
    <div class="header">
        <div class="header__logo" @click="navigateToHome()">
            <img src="../../../images/Logo.svg" alt="logo" />
        </div>
        <NMenu
            v-model:value="activeKey"
            class="header__menu"
            mode="horizontal"
            :options="menuOptions"
        />
        <AuthButtons />
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

        cursor: pointer;
    }
}
</style>
