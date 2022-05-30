<script setup lang="ts">
import type { Goal } from '@/models/goal/Goal';
import type { Topic } from '@/models/topic/Topic';
import { TopicSectionType } from '@/models/topic/TopicSection';
import { useGoalStore } from '@/stores/GoalStore';
import { useTopicStore } from '@/stores/TopicStore';
import { RouteNames } from '@/ui/router';
import { Plus, Trash } from '@vicons/tabler';
import { NButton, NList, NListItem, NSpace, NThing } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const goalStore = useGoalStore();
const { goals } = storeToRefs(goalStore);
const router = useRouter();

onMounted(async () => {
    goalStore.getAll();
});

const editGoal = (id: string) => {
    router.push({ name: RouteNames.AdminGoalBuilder, params: { id } });
};

const removeGoal = (id: string) => {
    // goalStore.remove(id);
};

const createGoal = async () => {
    // const newTopic = await goalStore.create({ title: 'Без названия', sections: [] });
    // if (newTopic) {
    //     editTopic(newTopic._id);
    // }
};

const description = computed(() => {
    return (goal: Goal) => {
        let result = `Разделов: ${goal?.topics?.length}. `;
        // const theories = topic.sections.filter((s) => s.type === TopicSectionType.Theory).length;
        // const trainings = topic.sections.filter((s) => s.type === TopicSectionType.Training).length;
        // const tests = topic.sections.filter((s) => s.type === TopicSectionType.Test).length;

        // result += theories ? `Теорий - ${theories}. ` : '';
        // result += trainings ? `Тренажёров - ${trainings}. ` : '';
        // result += tests ? `Контрольных - ${tests}. ` : '';

        return result;
    };
});
</script>

<template>
    <NButton round type="primary" @click="createGoal">
        <template #icon>
            <Plus />
        </template>
        Создать новую цель
    </NButton>

    <NList bordered>
        <NListItem
            v-for="goal of goals"
            :key="goal._id"
            class="list-item"
            @click="editGoal(goal._id)"
        >
            <NThing :title="goal.title">{{ description(goal) }}</NThing>
            <template #suffix>
                <NSpace>
                    <NButton type="error" round @click.stop="removeGoal(goal._id)">
                        <template #icon>
                            <Trash />
                        </template>
                    </NButton>
                </NSpace>
            </template>
        </NListItem>
    </NList>
</template>

<style scoped>
.list-item {
    cursor: pointer;
}
</style>
