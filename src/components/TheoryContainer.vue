<script setup lang="ts">
import { NThing, NAvatar, NIcon, NEllipsis, NButton } from 'naive-ui';
import { Book, Trash } from '@vicons/tabler';
import { defineProps } from 'vue';
import type { TheoryUnit } from '@/models/TheoryUnit';

interface Props {
    unit: TheoryUnit;
}

const props = defineProps<Props>();
</script>

<template>
    <NThing content-indented class="unit">
        <template #avatar>
            <NAvatar
                :style="{
                    backgroundColor: '#f0a020',
                }"
            >
                <NIcon :component="Book" />
            </NAvatar>
        </template>
        <template #header>{{ props.unit?.title }}</template>
        <template #description>Описание</template>
        <template #header-extra>
            <NButton circle size="small">
                <template #icon>
                    <Trash />
                </template>
            </NButton>
        </template>

        <NEllipsis expand-trigger="click" line-clamp="2" :tooltip="false">
            {{ props.unit?.content }}
        </NEllipsis>
    </NThing>
</template>

<style scoped lang="scss">
.unit {
    background: white;
    padding: 16px;
    &:last-child {
        margin-bottom: 0;
    }
}
</style>
