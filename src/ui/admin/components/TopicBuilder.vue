<script setup lang="ts">
import type { UpdateTopicSectionDto } from '@/models/topic/dto/UpdateTopicSectionDto';
import { TopicSectionType } from '@/models/topic/TopicSection';
import { useTopicStore } from '@/stores/TopicStore';
import { Book, ChartArcs, TestPipe } from '@vicons/tabler';
import { NButton, NIcon, NModal, NSpace } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import TaskForm from './TaskForm.vue';
import TopicSectionBuilder from './TopicSectionBuilder.vue';

const topicStore = useTopicStore();
const { topic } = storeToRefs(topicStore);
const route = useRoute();
let showModal = ref(false);

onMounted(() => {
    const topicId = route.params['id'];
    topicStore.getById(topicId as string);
});

const addSection = (type: TopicSectionType) => {
    const updatedSections = [...(topic.value?.sections || []), { type, theories: [], tasks: [] }];

    topicStore.update(topic.value?._id as string, {
        sections: updatedSections as UpdateTopicSectionDto[],
    });
};

const createTask = (task: any): void => {
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
        <NButton size="large" secondary type="warning" @click="addSection(TopicSectionType.THEORY)">
            <template #icon>
                <NIcon :component="Book" />
            </template>
            Добавить раздел теории
        </NButton>
        <NButton
            size="large"
            secondary
            type="success"
            @click="addSection(TopicSectionType.TRAINING)"
        >
            <template #icon>
                <NIcon :component="ChartArcs" />
            </template>
            Добавить тренажер
        </NButton>
        <NButton size="large" secondary type="error" @click="addSection(TopicSectionType.TEST)">
            <template #icon>
                <NIcon :component="TestPipe" />
            </template>
            Добавить контрольную
        </NButton>
    </NSpace>

    <n-modal v-model:show="showModal" preset="dialog">
        <template #header>
            <div>Создать задачу</div>
        </template>
        <TaskForm @save="createTask($event)" @close="showModal = false" />
    </n-modal>
</template>
