<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import TheoryContainer from './TheoryContainer.vue';
import TaskContainer from './TaskContainer.vue';

interface Unit {
    id: string;
    type: string;
}

interface Props {
    unit: Unit;
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
    <component :is="unitContainerComponent" v-bind="props.unit"></component>
</template>
