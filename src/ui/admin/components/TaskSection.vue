<script lang="ts" setup>
import { TopicSectionType, type TopicSection } from '@/models/topic/TopicSection';
import { useTaskStore } from '@/stores/TaskStore';
import { useTopicStore } from '@/stores/TopicStore';
import { Barbell, List, TestPipe, Trash } from '@vicons/tabler';
import { NAvatar, NButton, NGi, NGrid, NIcon, NThing, NDropdown } from 'naive-ui';
import type { Type } from 'naive-ui/lib/button/src/interface';
import { storeToRefs } from 'pinia';
import { computed, defineProps, onMounted } from 'vue';
import TaskCard from './TaskCard.vue';

interface Props {
    section: TopicSection;
}

const props = defineProps<Props>();
const avatarBG = computed(() => {
    if (props.section.type === TopicSectionType.Training) return '#18a058';
    if (props.section.type === TopicSectionType.Test) return '#d03050';
    return null;
});

const buttonType = computed(() => {
    if (props.section.type === TopicSectionType.Training) return 'success' as Type;
    if (props.section.type === TopicSectionType.Test) return 'error' as Type;

    return 'default' as Type;
});

const icon = computed(() => {
    if (props.section.type === TopicSectionType.Training) return Barbell;
    if (props.section.type === TopicSectionType.Test) return TestPipe;
    return null;
});

const title = computed(() => {
    if (props.section.type === TopicSectionType.Training) return 'Тренажер';
    if (props.section.type === TopicSectionType.Test) return 'Контроль';
    return null;
});

const taskStore = useTaskStore();
const topicStore = useTopicStore();
const { tasks } = storeToRefs(taskStore);

onMounted(async () => {
    await taskStore.getAll();
});

const options = computed(() => {
    return tasks?.value?.map((task) => ({
        label: task.properties.title,
        key: task.properties.sheetId,
    }));
});

const handleSelect = (event: number) => {
    topicStore.addTask(props.section._id, event);
};

const removeTask = (index: number) => {
    topicStore.removeTask(props.section._id, index);
};
</script>
<template>
    <NThing content-indented class="section" :class="props.section.type">
        <template #avatar>
            <NAvatar :style="{ backgroundColor: avatarBG }">
                <NIcon><component :is="icon"></component></NIcon>
            </NAvatar>
        </template>
        <template #header>{{ title }}</template>
        <template #header-extra>
            <NButton circle strong secondary type="error">
                <template #icon><Trash /></template>
            </NButton>
        </template>

        <NGrid class="unit-list" x-gap="16" y-gap="16" :cols="4">
            <NGi v-for="(task, index) of props.section.tasks" :key="task.properties.sheetId">
                <TaskCard :task="task" @remove="removeTask(index)" />
            </NGi>
        </NGrid>

        <template #footer>
            <NDropdown trigger="click" :options="options" @select="handleSelect">
                <NButton dashed :type="buttonType">
                    <template #icon> <NIcon :component="List" /> </template>
                    Добавить
                </NButton>
            </NDropdown>
        </template>
    </NThing>
</template>
<style scoped lang="scss">
@import '@/assets/variables.scss';

.section {
    padding: $base * 2;
    margin-bottom: $base * 2;
    &.training {
        background: $green-secondary;
    }
    &.test {
        background: $red-secondary;
    }
}

.unit-list {
    margin-bottom: $base * 3;
}
</style>
