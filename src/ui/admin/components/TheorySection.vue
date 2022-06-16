c
<script lang="ts" setup>
import type { TopicSection } from '@/models/topic/TopicSection';
import { useTopicStore } from '@/stores/TopicStore';
import { useTheoryStore } from '@/stores/TheoryStore';
import { List, Plus, Trash } from '@vicons/tabler';
import { NButton, NGi, NGrid, NSpace, NThing, NDropdown } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { defineProps, onMounted, ref, computed, type ComputedRef } from 'vue';
import TheoryCard from './TheoryCard.vue';
import type { Theory } from '@/models/theory/Theory';

interface Props {
    section: TopicSection;
}

interface Emits {
    (e: 'add'): void;
    (e: 'select', theory: Theory): void;
    (e: 'edit', theoryId: string): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const topicStore = useTopicStore();
const theoryStore = useTheoryStore();
const { topic } = storeToRefs(topicStore);
const { theories } = storeToRefs(theoryStore);

const theoryOptions: ComputedRef<{ label: string; key: Theory['_id'] }[]> = computed(() => {
    return theories.value.map((item) => ({ label: item.title, key: item._id }));
});

onMounted(async () => {
    await theoryStore.getAll();
});

const removeSection = (): void => {
    if (topic.value) {
        topicStore.removeSection(topic.value._id, props.section._id);
    }
};

const removeTheory = (theoryId: string): void => {
    if (theories.value.length) {
        topicStore.removeTheory(props.section._id, theoryId);
    }
};

const onSelect = (theoryId: Theory['_id']): void => {
    const theory = theories.value.find((t) => t._id === theoryId);
    theory ? emit('select', theory) : null;
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
                <TheoryCard
                    :theory="theory"
                    @edit="emit('edit', $event)"
                    @remove="removeTheory($event)"
                />
            </NGi>
        </NGrid>

        <template #footer>
            <NSpace>
                <NButton dashed type="warning" @click="emit('add')">
                    <template #icon><Plus /></template>
                    Добавить новую
                </NButton>
                <n-dropdown trigger="click" :options="theoryOptions" @select="onSelect($event)">
                    <n-button dashed type="warning">
                        <template #icon>
                            <List />
                        </template>
                        Выбрать существующую
                    </n-button>
                </n-dropdown>
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
