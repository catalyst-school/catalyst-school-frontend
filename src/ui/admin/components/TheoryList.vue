<script lang="ts" setup>
import { useTheoryStore } from '@/stores/TheoryStore';
import { List, Plus } from '@vicons/tabler';
import { NButton, NDropdown, NSpace } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed, type ComputedRef, onMounted } from 'vue';
import type { Theory } from '@/models/theory/Theory';

interface Emits {
    (e: 'add'): void;
    (e: 'select', theory: Theory): void;
}

const emit = defineEmits<Emits>();

const theoryStore = useTheoryStore();
const { theories } = storeToRefs(theoryStore);

const theoryOptions: ComputedRef<{ label: string; key: Theory['_id'] }[]> = computed(() => {
    return theories.value.map((item) => ({ label: item.title, key: item._id }));
});

onMounted(async () => {
    await theoryStore.getAll();
});

const onSelect = (theoryId: Theory['_id']): void => {
    const theory = theories.value.find((t) => t._id === theoryId);
    theory ? emit('select', theory) : null;
};
</script>

<template>
    <NSpace>
        <NButton dashed type="warning" @click="emit('add')">
            <template #icon><Plus /></template>
            Добавить новую
        </NButton>
        <n-dropdown trigger="click" :options="theoryOptions" @select="onSelect($event)">
            <n-button dashed type="warning">
                <template #icon>
                    <List />
                </template>
                Выбрать существующую
            </n-button>
        </n-dropdown>
    </NSpace>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';
</style>
