<script lang="ts" setup>
import type { TopicSection } from '@/models/topic/TopicSection';
import { useTopicStore } from '@/stores/TopicStore';
import { List, Plus, Trash } from '@vicons/tabler';
import { NButton, NGi, NGrid, NSpace, NThing } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { defineProps } from 'vue';
import TheoryCard from './TheoryCard.vue';

interface Props {
    section: TopicSection;
}

const topicStore = useTopicStore();
const { topic } = storeToRefs(topicStore);

const emit = defineEmits<{
    (e: 'add'): void;
    (e: 'select'): void;
}>();
const props = defineProps<Props>();
const removeSection = () => {
    if (topic.value) topicStore.removeSection(topic.value._id, props.section._id);
};
</script>

<template>
    <NThing content-indented class="section" :class="props.section.type">
        <template #header>Теория</template>
        <template #header-extra>
            <NButton circle strong secondary type="error" @click="removeSection">
                <template #icon><Trash /></template>
            </NButton>
        </template>

        <NGrid class="unit-list" x-gap="16" y-gap="16" :cols="4">
            <NGi v-for="theory of props.section.theories" :key="theory._id">
                <TheoryCard :theory="theory" />
            </NGi>
        </NGrid>

        <template #footer>
            <NSpace>
                <NButton dashed type="warning" @click="emit('add')">
                    <template #icon><Plus /></template>
                    Добавить новую
                </NButton>
                <NButton dashed type="warning" @click="emit('select')">
                    <template #icon><List /></template>
                    Выбрать существующую
                </NButton>
            </NSpace>
        </template>
    </NThing>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.section {
    padding: $base * 2;
    margin-bottom: $base * 2;
    background: $yellow-secondary;
}

.unit-list {
    margin-bottom: $base * 3;
}
</style>
