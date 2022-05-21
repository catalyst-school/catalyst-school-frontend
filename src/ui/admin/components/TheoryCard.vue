<script setup lang="ts">
import type { Theory } from '@/models/theory/Theory';
import { Trash } from '@vicons/tabler';
import { NButton, NEllipsis, NThing } from 'naive-ui';
import { defineProps } from 'vue';

interface Props {
    theory: Theory;
}

const props = defineProps<Props>();
</script>

<template>
    <NThing content-indented class="unit">
        <template #header>{{ props.theory?.title }}</template>
        <template #header-extra>
            <NButton circle size="small">
                <template #icon>
                    <Trash />
                </template>
            </NButton>
        </template>

        <NEllipsis expand-trigger="click" line-clamp="2" :tooltip="false">
            {{ props.theory?.content }}
        </NEllipsis>
    </NThing>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.unit {
    background: white;
    padding: $base * 2;

    &:last-child {
        margin-bottom: 0;
    }
}
</style>
