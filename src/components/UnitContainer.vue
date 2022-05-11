<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import TheoryContainer from './TheoryContainer.vue';
import TaskContainer from './TaskContainer.vue';
import type { LearningUnit } from '@/models/LearningUnit';

interface Props {
    unit: LearningUnit;
}

const props = defineProps<Props>();

const unitContainerComponent = computed(() => {
    switch (props?.unit?.type) {
        case 'theory':
            return TheoryContainer;
        case 'task':
            return TaskContainer;
        default:
            return '';
    }
});
</script>

<template>
    <component :is="unitContainerComponent" :unit="props.unit"></component>
</template>
