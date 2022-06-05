<script setup lang="ts">
import type { Goal } from '@/models/goal/Goal';
import { useGoalStore } from '@/stores/GoalStore';
import { RouteNames } from '@/ui/router';
import { Plus, Trash, Target } from '@vicons/tabler';
import { NButton, NList, NListItem, NSpace, NThing, NAvatar, NIcon } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
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
    goalStore.remove(id);
};

const createGoal = async () => {
    const newGoal = await goalStore.create({ title: 'Без названия', topics: [] });
    if (newGoal) {
        editGoal(newGoal._id);
    }
};

const description = computed(() => {
    return (goal: Goal) => `Тем: ${goal?.topics?.length}`;
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
            <NThing :title="goal.title" content-indented>
                <template #avatar>
                    <n-avatar :style="{ background: 'white' }">
                        <n-icon color="black">
                            <Target />
                        </n-icon>
                    </n-avatar>
                </template>
                {{ description(goal) }}
            </NThing>
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
