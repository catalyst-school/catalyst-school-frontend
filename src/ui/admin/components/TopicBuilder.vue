<script setup lang="ts">
import { TopicSectionType } from '@/models/topic/TopicSection';
import { useTopicStore } from '@/stores/TopicStore';
import { RouteNames } from '@/ui/router';
import { Book, ChartArcs, TestPipe } from '@vicons/tabler';
import { NButton, NIcon, NPageHeader, NSpace } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EditableHeader from './EditableHeader.vue';
import TaskSection from './TaskSection.vue';
import TheorySection from './TheorySection.vue';
import type { Theory } from '@/models/theory/Theory';

const topicStore = useTopicStore();
const { topic } = storeToRefs(topicStore);
const route = useRoute();
const router = useRouter();
const topicId = route.params['id'] as string;

onMounted(() => {
    topicStore.getById(topicId);
});

const navigateToCreateForm = (sectionId: string): void => {
    router.push({ name: RouteNames.CreateTheoryForm, query: { topicId, sectionId } });
};

const navigateToEditForm = (theoryId: string): void => {
    router.push({
        name: RouteNames.UpdateTheoryForm,
        params: { id: theoryId },
        query: { topicId: topicId },
    });
};

const selectTheory = (theory: Theory, sectionId: string) => {
    topicStore.addTheory(sectionId, theory);
};

const addSection = (type: TopicSectionType): void => {
    topicStore.addSection(topic.value?._id as string, type);
};

const changeTitle = (title: string): void => {
    topicStore.updateTitle(topic.value?._id as string, title);
};

const handleBack = (): void => {
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
        <TaskSection
            v-if="
                section.type === TopicSectionType.Training || section.type === TopicSectionType.Test
            "
            :section="section"
        />
        <TheorySection
            v-else
            :section="section"
            @add="navigateToCreateForm(section._id)"
            @edit="navigateToEditForm($event)"
            @select="selectTheory($event, section._id)"
        />
    </template>
    <NSpace>
        <NButton size="large" secondary type="warning" @click="addSection(TopicSectionType.Theory)">
            <template #icon>
                <NIcon :component="Book" />
            </template>
            Добавить теорию
        </NButton>
        <NButton
            size="large"
            secondary
            type="success"
            @click="addSection(TopicSectionType.Training)"
        >
            <template #icon>
                <NIcon :component="ChartArcs" />
            </template>
            Добавить тренажер
        </NButton>
        <NButton size="large" secondary type="error" @click="addSection(TopicSectionType.Test)">
            <template #icon>
                <NIcon :component="TestPipe" />
            </template>
            Добавить контрольную
        </NButton>
    </NSpace>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.title {
    margin-bottom: $base * 2;
}
</style>
