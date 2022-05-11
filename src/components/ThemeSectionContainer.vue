<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import UnitContainer from './UnitContainer.vue';
import { NAvatar, NSpace, NButton, NIcon, NGrid, NGi, NThing } from 'naive-ui';
import { Plus, List, Barbell, TestPipe, Briefcase, Trash } from '@vicons/tabler';
import type { ThemeSection } from '@/models/ThemeSection';
import type { Type } from 'naive-ui/lib/button/src/interface';

interface Props {
    section: ThemeSection;
}

interface Events {
    (e: 'add'): void;
}

const props = defineProps<Props>();
const avatarBG = computed(() => {
    if (props.section.type === 'theory') return '#f0a020';
    if (props.section.type === 'training') return '#18a058';
    if (props.section.type === 'test') return '#d03050';
    return null;
});

const buttonType = computed(() => {
    if (props.section.type === 'theory') return 'warning' as Type;
    if (props.section.type === 'training') return 'success' as Type;
    if (props.section.type === 'test') return 'error' as Type;

    return 'default' as Type;
});

const icon = computed(() => {
    if (props.section.type === 'theory') return Briefcase;
    if (props.section.type === 'training') return Barbell;
    if (props.section.type === 'test') return TestPipe;
    return null;
});

const title = computed(() => {
    if (props.section.type === 'theory') return 'Теория';
    if (props.section.type === 'training') return 'Тренажер';
    if (props.section.type === 'test') return 'Контроль';
    return null;
});

defineEmits<Events>();
</script>

<template>
    <NThing content-indented class="section" :class="props.section.type">
        <template #avatar>
            <NAvatar
                :style="{
                    backgroundColor: avatarBG,
                }"
            >
                <NIcon>
                    <component :is="icon"></component>
                </NIcon>
            </NAvatar>
        </template>
        <template #header>{{ title }}</template>
        <template #header-extra>
            <NButton circle strong secondary type="error">
                <template #icon>
                    <Trash />
                </template>
            </NButton>
        </template>

        <NGrid class="unit-list" x-gap="16" y-gap="16" :cols="4">
            <NGi v-for="unit of props.section.units" :key="unit.id">
                <UnitContainer :unit="unit"></UnitContainer>
            </NGi>
        </NGrid>

        <template #footer>
            <n-space>
                <NButton dashed :type="buttonType" @click="$emit('add')">
                    <template #icon>
                        <NIcon :component="Plus" />
                    </template>
                    Добавить новую
                </NButton>
                <NButton dashed :type="buttonType">
                    <template #icon>
                        <NIcon :component="List" />
                    </template>
                    Выбрать существующую
                </NButton>
            </n-space>
        </template>
    </NThing>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.section {
    padding: 16px;
    margin-bottom: 16px;

    &.theory {
        background: $yellow-secondary;
    }
    &.training {
        background: $green-secondary;
    }
    &.test {
        background: $red-secondary;
    }
}

.title {
    &.theory {
        color: $yellow-main;
    }
    &.training {
        color: $green-main;
    }
    &.test {
        color: $red-main;
    }
}

.unit-list {
    margin-bottom: $base * 3;
}
</style>
