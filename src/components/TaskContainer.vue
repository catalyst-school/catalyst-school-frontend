<script setup lang="ts">
import { NThing, NAvatar, NIcon, NEllipsis, NButton } from 'naive-ui';
import { Edit, Trash } from '@vicons/tabler';
import type { TaskUnit } from '@/models/TaskUnit';

interface Props {
    unit: TaskUnit;
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
            {{ props.unit?.description }}
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
