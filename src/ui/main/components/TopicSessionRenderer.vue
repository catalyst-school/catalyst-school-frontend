<script setup lang="ts">
import { NButton } from 'naive-ui';
import { computed, defineProps, ref } from 'vue';
import type { TopicSession } from '@/models/topic-session/TopicSession';
import type { Topic } from '@/models/topic/Topic';
import type { Theory } from '@/models/theory/Theory';
import type { Task } from '@/models/task/Task';
import { TopicSectionType, type TopicSection } from '@/models/topic/TopicSection';
import type { CheckUnitDto } from '@/models/topic-session/CheckUnitDto';

interface Props {
    topic: Topic;
    topicSession: TopicSession;
}

const emit = defineEmits<{
    (e: 'completed'): void;
    (e: 'next', event: CheckUnitDto): void;
}>();
const props = defineProps<Props>();
let currentSectionIndex = ref(0);
let currentStepIndex = ref(0);

const currentStep = computed(() => {
    const currentList = getCurrentList();
    if (currentList) {
        return currentList[currentStepIndex.value];
    } else {
        return undefined;
    }
});

const isTheory = computed(() => {
    return props.topic?.sections[currentSectionIndex.value]?.type === TopicSectionType.Theory;
});

const goToNextStep = () => {
    // todo fix with better typing
    emit('next', {
        sectionType: getCurrentSection().type,
        unitId: ((currentStep?.value as Theory)?._id ||
            (currentStep?.value as Task)?.properties?.sheetId) as any,
    });

    if (isLastStepInSection()) {
        if (isLastSection()) {
            emit('completed');
        } else {
            currentSectionIndex.value++;
            currentStepIndex.value = 0;
        }
    } else {
        currentStepIndex.value++;
    }
};

const isNextSectionType = computed(() => {
    return (type: TopicSectionType) => {
        return isLastStepInSection() && getNextSection()?.type === type;
    };
});

const getCurrentSection = (): TopicSection => {
    return props.topic.sections[currentSectionIndex.value];
};

const getNextSection = (): TopicSection => {
    return props.topic.sections[currentSectionIndex.value + 1];
};

const getCurrentList = (): Theory[] | Task[] | undefined => {
    return isTheory.value ? getCurrentSection().theories : getCurrentSection().tasks;
};

const isLastSection = (): boolean => {
    return props.topic?.sections?.length === currentSectionIndex.value + 1;
};

const isLastStepInSection = (): boolean => {
    return getCurrentList()?.length === currentStepIndex.value + 1;
};
</script>

<template>
    <h1>{{ topic.title }}</h1>
    <div v-if="isTheory">
        <p>Теория</p>
        <p>{{ currentStep }}</p>
    </div>
    <div v-else>
        <p>Задача</p>
        <p>{{ currentStep }}</p>
    </div>

    <NButton v-if="isNextSectionType(TopicSectionType.Theory)" strong @click="goToNextStep">
        Продолжить теорию
    </NButton>
    <NButton v-else-if="isNextSectionType(TopicSectionType.Training)" strong @click="goToNextStep">
        Перейти к тренажеру
    </NButton>
    <NButton v-else-if="isNextSectionType(TopicSectionType.Test)" strong @click="goToNextStep">
        Перейти к тесту
    </NButton>
    <NButton v-else strong @click="goToNextStep">Дальше</NButton>
</template>
<style scoped lang="scss">
@import '@/assets/variables.scss';
</style>
