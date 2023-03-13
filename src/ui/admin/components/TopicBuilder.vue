<script setup lang="ts">
import { useTopicStore } from '@/stores/TopicStore';
import { RouteNames } from '@/ui/router';
import { NPageHeader, NSpace } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EditableHeader from './EditableHeader.vue';
import type { Theory } from '@/models/theory/Theory';
import UnitCard from '@/ui/admin/components/UnitCard.vue';
import TheoryList from '@/ui/admin/components/TheoryList.vue';
import type { Unit } from '@/models/topic/Unit';
import { UnitType } from '@/models/topic/Unit';

const topicStore = useTopicStore();
const { topic } = storeToRefs(topicStore);
const route = useRoute();
const router = useRouter();
const topicId = route.params['id'] as string;

onMounted(() => {
    topicStore.getById(topicId);
});

const navigateToCreateForm = (): void => {
    router.push({ name: RouteNames.CreateTheoryForm, query: { topicId } });
};

const navigateToEditForm = (theoryId: string): void => {
    router.push({
        name: RouteNames.UpdateTheoryForm,
        params: { id: theoryId },
        query: { topicId: topicId },
    });
};

const selectTheory = (theory: Theory) => {
    topicStore.addUnit({ ref: theory._id, type: UnitType.Theory });
};

const addNewTheory = () => {
    navigateToCreateForm();
};

const removeUnit = (unit: Unit) => {
    topicStore.removeUnit(unit);
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

    <NSpace>
        <TheoryList @add="addNewTheory" @select="selectTheory"></TheoryList>
    </NSpace>

    <template v-for="unit of topic?.units" :key="unit._id">
        <UnitCard :unit="unit" @remove="removeUnit" />
    </template>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.title {
    margin-bottom: $base * 2;
}
</style>
