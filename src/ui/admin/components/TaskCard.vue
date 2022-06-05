<script setup lang="ts">
import type { Task } from '@/models/task/Task';
import { Trash } from '@vicons/tabler';
import { NButton, NThing } from 'naive-ui';

interface Props {
    task: Task;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: 'remove', id: number): void;
}>();
</script>

<template>
    <NThing content-indented class="unit">
        <template #header>{{ props.task?.properties?.title }}</template>
        <template #header-extra>
            <NButton circle size="small" @click="emit('remove', props.task.properties.sheetId)">
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
.avatar {
    background-color: $green-main;
}
</style>
