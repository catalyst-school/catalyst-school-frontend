<script setup lang="ts">
import { NThing, NAvatar, NIcon, NEllipsis, NButton } from 'naive-ui';
import { Edit, Trash } from '@vicons/tabler';
import type { Task } from '@/models/task/Task';

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
        <template #avatar>
            <NAvatar class="avatar">
                <NIcon :component="Edit" />
            </NAvatar>
        </template>
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
