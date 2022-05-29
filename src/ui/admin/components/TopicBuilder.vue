<script setup lang="ts">
import TopicSectionBuilder from './TopicSectionBuilder.vue';
import { NSpace, NButton, NIcon, NModal } from 'naive-ui';
import { Book, ChartArcs, TestPipe } from '@vicons/tabler';
import { onMounted, ref } from 'vue';
import { useTopicStore } from '@/stores/TopicStore';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import TaskForm from './TaskForm.vue';
import type { TopicSection } from '@/models/topic/TopicSection';

const topicStore = useTopicStore();
const { topic } = storeToRefs(topicStore);
const route = useRoute();
const router = useRouter();
let showModal = ref(false);
let showTheoryForm = ref(false);

onMounted(() => {
    const topicId = route.params['id'];
    topicStore.getById(topicId as string);
});

const createTask = (task: any): void => {
    // todo: реализовать сервис, добавить интерфейс
    console.log('createTask');
    showModal.value = false;
};

const navigateToForm = (section: TopicSection): void => {
    switch (section.type) {
        case 'theory':
            router.push({ name: 'theory-form' });
            break;
    }
};
</script>

<template>
    <template v-for="section of topic?.sections" :key="section.id">
        <TopicSectionBuilder
            :section="section"
            @add="navigateToForm(section)"
        ></TopicSectionBuilder>
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

    <n-modal v-model:show="showModal" preset="dialog">
        <template #header>
            <div>Создать задачу</div>
        </template>
        <TaskForm @save="createTask($event)" @close="showModal = false" />
    </n-modal>
</template>
