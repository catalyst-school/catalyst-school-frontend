<script lang="ts" setup>
import type { UpdateTopicSectionDto } from '@/models/topic/dto/UpdateTopicSectionDto';
import { TopicSectionType, type TopicSection } from '@/models/topic/TopicSection';
import { useTopicStore } from '@/stores/TopicStore';
import { Barbell, Briefcase, List, Plus, TestPipe, Trash } from '@vicons/tabler';
import { NAvatar, NButton, NGi, NGrid, NIcon, NSpace, NThing } from 'naive-ui';
import type { Type } from 'naive-ui/lib/button/src/interface';
import { storeToRefs } from 'pinia';
import { computed, defineProps } from 'vue';
import TaskCard from './TaskCard.vue';
import TheoryCard from './TheoryCard.vue';

interface Props {
    section: TopicSection;
}

const topicStore = useTopicStore();
const { topic } = storeToRefs(topicStore);

const props = defineProps<Props>();
const avatarBG = computed(() => {
    if (props.section.type === TopicSectionType.THEORY) return '#f0a020';
    if (props.section.type === TopicSectionType.TRAINING) return '#18a058';
    if (props.section.type === TopicSectionType.TEST) return '#d03050';
    return null;
});

const buttonType = computed(() => {
    if (props.section.type === TopicSectionType.THEORY) return 'warning' as Type;
    if (props.section.type === TopicSectionType.TRAINING) return 'success' as Type;
    if (props.section.type === TopicSectionType.TEST) return 'error' as Type;

    return 'default' as Type;
});

const icon = computed(() => {
    if (props.section.type === TopicSectionType.THEORY) return Briefcase;
    if (props.section.type === TopicSectionType.TRAINING) return Barbell;
    if (props.section.type === TopicSectionType.TEST) return TestPipe;
    return null;
});

const title = computed(() => {
    if (props.section.type === TopicSectionType.THEORY) return 'Теория';
    if (props.section.type === TopicSectionType.TRAINING) return 'Тренажер';
    if (props.section.type === TopicSectionType.TEST) return 'Контроль';
    return null;
});

const removeSection = () => {
    const updatedSections = topic.value?.sections.filter((s) => s._id !== props.section._id);

    topicStore.update(topic.value?._id as string, {
        sections: updatedSections as UpdateTopicSectionDto[],
    });
};
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
            <NButton circle strong secondary type="error" @click="removeSection">
                <template #icon>
                    <Trash />
                </template>
            </NButton>
        </template>

        <NGrid class="unit-list" x-gap="16" y-gap="16" :cols="4">
            <template v-if="props.section.type === TopicSectionType.THEORY">
                <NGi v-for="theory of props.section.theories" :key="theory._id">
                    <TheoryCard :theory="theory" />
                </NGi>
            </template>
            <template v-else>
                <NGi v-for="task of props.section.tasks" :key="task._id">
                    <TaskCard :task="task" />
                </NGi>
            </template>
        </NGrid>

        <template #footer>
            <n-space>
                <NButton dashed :type="buttonType">
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

.unit-list {
    margin-bottom: $base * 3;
}
</style>
