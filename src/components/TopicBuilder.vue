<script setup lang="ts">
import TopicSectionBuilder from '@/components/TopicSectionBuilder.vue';
import { NSpace, NButton, NIcon } from 'naive-ui';
import { Book, ChartArcs, TestPipe } from '@vicons/tabler';
import { onMounted } from 'vue';
import { useTopicStore } from '@/stores/TopicStore';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const topicStore = useTopicStore();
const { topic } = storeToRefs(topicStore);
const route = useRoute();

onMounted(() => {
    const topicId = route.params['id'];
    topicStore.getById(topicId as string);
});
</script>

<template>
    <template v-for="section of topic?.sections" :key="section.id">
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
