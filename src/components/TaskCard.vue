<script setup lang="ts">
import { NThing, NAvatar, NIcon, NEllipsis, NButton } from 'naive-ui';
import { Edit, Trash } from '@vicons/tabler';
import type { Task } from '@/models/task/Task';

interface Props {
    task: Task;
}

const props = defineProps<Props>();
</script>

<template>
    <NThing content-indented class="unit">
        <template #avatar>
            <NAvatar class="avatar">
                <NIcon :component="Edit" />
            </NAvatar>
        </template>
        <template #header>Задача</template>
        <template #header-extra>
            <NButton circle size="small">
                <template #icon>
                    <Trash />
                </template>
            </NButton>
        </template>
        <template #description>Описание</template>

        <NEllipsis expand-trigger="click" line-clamp="1" :tooltip="false">
            {{ props.task?.description }}
        </NEllipsis>
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
