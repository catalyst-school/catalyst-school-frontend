<script setup lang="ts">
import HeaderComponent from '../components/HeaderComponent.vue';
</script>

<template>
    <HeaderComponent />
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
