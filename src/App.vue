<script lang="ts" setup>
import AdminMenu from '@/ui/admin/components/AdminMenu.vue';
import { RouterView } from 'vue-router';
</script>

<template>
    <AdminMenu />
    <main>
        <RouterView />
    </main>
</template>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

main {
    padding: $base * 2;
    background-color: var(--main-red);
}
</style>
