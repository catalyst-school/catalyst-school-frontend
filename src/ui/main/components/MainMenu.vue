<script setup lang="ts">
import { RouteNames } from '@/ui/router';
import { Crane, Home } from '@vicons/tabler';
import { NIcon, NMenu, NSpace, type MenuOption } from 'naive-ui';
import { h, ref, watch, type Component } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import AuthButtons from '@/ui/shared/components/AuthButtons.vue';

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
    <n-space align="center" justify="space-between">
        <NMenu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
        <AuthButtons />
    </n-space>
</template>
<style scoped lang="scss">
@import '@/assets/variables.scss';

.btn {
    margin-right: $base * 4;
}
</style>
