<script setup lang="ts">
import { Trash } from '@vicons/tabler';
import { NButton, NThing } from 'naive-ui';
import type { Unit } from '@/models/topic/Unit';

interface Props {
    unit: Unit;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: 'remove', unit: Unit): void;
}>();
</script>

<template>
    <NThing content-indented class="unit">
        <template #header>{{ props.unit?.ref }}</template>
        <template #header-extra>
            <NButton circle size="small" @click="emit('remove', props.unit)">
                <template #icon>
                    <Trash />
                </template>
            </NButton>
        </template>
    </NThing>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.unit {
    background: white;
    padding: 16px;

    &:last-child {
        margin-bottom: 0;
    }
}
</style>
