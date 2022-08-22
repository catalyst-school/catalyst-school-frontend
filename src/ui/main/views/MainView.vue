<script setup lang="ts">
import MainMenu from '../components/MainMenu.vue';
</script>

<template>
    <MainMenu />
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
