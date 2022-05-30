<script setup lang="ts">
import { RouteNames } from '@/ui/router';
import { Home, Subtask, Target } from '@vicons/tabler';
import { NIcon, type MenuOption, NMenu } from 'naive-ui';
import { type Component, h, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
    {
        label: () =>
            h(RouterLink, { to: { name: RouteNames.Admin } }, { default: () => 'Админка' }),
        key: RouteNames.Admin,
        icon: renderIcon(Home),
    },
    {
        label: () =>
            h(
                RouterLink,
                { to: { name: RouteNames.AdminGoalList } },
                { default: () => 'Конструктор целей' },
            ),
        key: RouteNames.AdminGoalList,
        icon: renderIcon(Target),
    },
    {
        label: () =>
            h(
                RouterLink,
                { to: { name: RouteNames.AdminTopicList } },
                { default: () => 'Конструктор тем' },
            ),
        key: RouteNames.AdminTopicList,
        icon: renderIcon(Subtask),
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
