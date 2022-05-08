<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import TheoryContainer from './TheoryContainer.vue';

interface UnitContainerProps {
    unit: {
        type: string;
    };
}

const props = defineProps<UnitContainerProps>();

const unitContainerComponent = computed(() => {
    switch (props?.unit?.type) {
        case 'theory':
            return TheoryContainer;
        default:
            return '';
    }
});
</script>

<template>
    <component :is="unitContainerComponent" v-bind="props.unit"></component>
</template>
