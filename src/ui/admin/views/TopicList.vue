<script setup lang="ts">
import { NPageHeader } from 'naive-ui';
import TopicList from '../components/TopicList.vue';
</script>

<template>
    <div class="title">
        <NPageHeader title="Конструктор Тем" />
    </div>

    <TopicList />
</template>

<style scoped lang="scss">
.title {
    margin-bottom: 24px;
}
</style>
