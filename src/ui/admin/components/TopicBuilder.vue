<script setup lang="ts">
import { TopicSectionType } from '@/models/topic/TopicSection';
import { useTopicStore } from '@/stores/TopicStore';
import { RouteNames } from '@/ui/router';
import { Book, ChartArcs, TestPipe } from '@vicons/tabler';
import { NButton, NIcon, NModal, NPageHeader, NSpace } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EditableHeader from './EditableHeader.vue';
import TaskForm from './TaskForm.vue';
import TopicSectionBuilder from './TopicSectionBuilder.vue';

const topicStore = useTopicStore();
const { topic } = storeToRefs(topicStore);
const route = useRoute();
const router = useRouter();
let showModal = ref(false);

onMounted(() => {
    const topicId = route.params['id'];
    topicStore.getById(topicId as string);
});

const addSection = (type: TopicSectionType) => {
    topicStore.addSection(topic.value?._id as string, type);
};

const createTask = (task: any): void => {
    // todo: реализовать сервис, добавить интерфейс
    console.log('createTask');
    showModal.value = false;
};

const changeTitle = (title: string): void => {
    topicStore.updateTitle(topic.value?._id as string, title);
};

const handleBack = () => {
    router.push({ name: RouteNames.AdminTopicList });
};
</script>

<template>
    <NPageHeader class="title" @back="handleBack">
        <template #title>
            <EditableHeader v-if="topic" :title="topic.title" @update="changeTitle" />
        </template>
    </NPageHeader>

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

<style scoped lang="scss">
@import '@/assets/variables.scss';

.title {
    margin-bottom: $base * 2;
}
</style>
