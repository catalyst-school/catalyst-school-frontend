<script setup lang="ts">
import type { Theory } from '@/models/theory/Theory';
import { Trash, Edit } from '@vicons/tabler';
import { NButton, NThing, NSpace } from 'naive-ui';
import { defineProps } from 'vue';

interface Props {
    theory: Theory;
}
interface Emits {
    (e: 'remove', id: string): void;
    (e: 'edit', id: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<template>
    <NThing content-indented class="unit">
        <template #header>{{ props.theory?.title }} </template>
        <template #header-extra>
            <n-space>
                <n-button circle size="small" @click="emit('edit', props.theory._id)">
                    <template #icon>
                        <Edit />
                    </template>
                </n-button>
                <n-button circle size="small" @click="emit('remove', props.theory._id)">
                    <template #icon>
                        <Trash />
                    </template>
                </n-button>
            </n-space>
        </template>
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
