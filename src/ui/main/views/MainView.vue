<script setup lang="ts">
import MainMenu from '../components/MainMenu.vue';
import UserPath from '../components/UserPath.vue';
</script>

<template>
    <MainMenu />
    <main>
        <UserPath />
    </main>
</template>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

main {
    padding: $base * 2;
    background-color: var(--main-red);
}
</style>
