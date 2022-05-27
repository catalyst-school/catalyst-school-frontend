<script setup lang="ts">
import { RouterView } from 'vue-router';
import AdminMenu from '../components/AdminMenu.vue';
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
