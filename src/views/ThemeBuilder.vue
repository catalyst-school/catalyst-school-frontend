<script setup lang="ts">
import { NPageHeader } from 'naive-ui';
import ThemeContainer from '@/components/ThemeContainer.vue';
</script>

<template>
    <div class="title">
        <NPageHeader title="Конструктор Тем" />
    </div>

    <ThemeContainer />
</template>

<style scoped lang="scss">
.title {
    margin-bottom: 24px;
}
</style>
