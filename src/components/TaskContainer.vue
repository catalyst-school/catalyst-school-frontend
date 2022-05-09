<script setup lang="ts">
import { NThing, NAvatar, NIcon, NEllipsis } from 'naive-ui';
import { Edit } from '@vicons/tabler';

interface TaskUnit {
    title: string;
    content: string;
}

const props = defineProps<TaskUnit>();
</script>

<template>
    <NThing content-indented class="unit">
        <template #avatar>
            <NAvatar
                :style="{
                    backgroundColor: '#18a058',
                }"
            >
                <NIcon :component="Edit" />
            </NAvatar>
        </template>
        <template #header>{{ props?.title }}</template>
        <template #description>Описание</template>

        <NEllipsis expand-trigger="click" line-clamp="2" :tooltip="false">
            {{ props?.content }}
        </NEllipsis>
    </NThing>
</template>

<style scoped>
.unit {
    max-width: 320px;
    padding: 16px;
    margin-bottom: 24px;
    border: 1px solid #efeff5ff;
}
</style>
