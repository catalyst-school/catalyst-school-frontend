<script setup lang="ts">
import TopicSectionBuilder from '@/components/TopicSectionBuilder.vue';
import { NSpace, NButton, NIcon } from 'naive-ui';
import { Book, ChartArcs, TestPipe } from '@vicons/tabler';
import type { Topic } from '@/models/Topic';

// todo take id from url and request from backend
const topic = {} as Topic;
</script>

<template>
    <template v-for="section of topic.sections" :key="section.id">
        <TopicSectionBuilder :section="section"></TopicSectionBuilder>
    </template>
    <NSpace>
        <NButton size="large" secondary type="warning">
            <template #icon>
                <NIcon :component="Book" />
            </template>
            Добавить теорию
        </NButton>
        <NButton size="large" secondary type="success">
            <template #icon>
                <NIcon :component="ChartArcs" />
            </template>
            Добавить тренажер
        </NButton>
        <NButton size="large" secondary type="error">
            <template #icon>
                <NIcon :component="TestPipe" />
            </template>
            Добавить контроль
        </NButton>
    </NSpace>
</template>

<style></style>
