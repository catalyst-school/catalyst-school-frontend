<script setup lang="ts">
import { NPageHeader } from 'naive-ui';
import TopicBuilder from '../components/TopicBuilder.vue';
</script>

<template>
    <div class="title">
        <NPageHeader title="Конструктор Тем" />
    </div>

    <TopicBuilder />
</template>

<style scoped lang="scss">
.title {
    margin-bottom: 24px;
}
</style>
