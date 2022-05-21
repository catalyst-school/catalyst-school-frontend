<script setup lang="ts">
import TopicSectionBuilder from './TopicSectionBuilder.vue';
import { NSpace, NButton, NIcon, NModal } from 'naive-ui';
import { Book, ChartArcs, TestPipe } from '@vicons/tabler';
import { onMounted, ref } from 'vue';
import { useTopicStore } from '@/stores/TopicStore';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import CreateTaskForm from './TaskForm.vue';

const topicStore = useTopicStore();
const { topic } = storeToRefs(topicStore);
const route = useRoute();
let showModal = ref(false);

onMounted(() => {
    const topicId = route.params['id'];
    topicStore.getById(topicId as string);
});

const createTask = (task): void => {
    // todo: реализовать сервис, добавить интерфейс
    console.log('createTask');
    showModal.value = false;
};
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

    <n-modal v-model:show="showModal" preset="dialog">
        <template #header>
            <div>Создать задачу</div>
        </template>
        <CreateTaskForm @save="createTask(task)" @close="showModal = false"></CreateTaskForm>
    </n-modal>
</template>
