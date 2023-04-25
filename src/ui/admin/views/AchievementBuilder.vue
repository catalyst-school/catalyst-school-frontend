<script setup lang="ts">
import { useAchievementStore } from '@/stores/achievementStore';
import { RouteNames } from '@/ui/router';
import { NPageHeader, NListItem, NList, NThing, NIcon, NGrid, NGi, NButton } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { DotsVertical } from '@vicons/tabler';
import { onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EditableHeader from '../components/EditableHeader.vue';
import * as draggable from 'vuedraggable';
import { useTopicStore } from '@/stores/TopicStore';
import type { Topic } from '@/models/topic/Topic';
import type { Goal } from '@/models/goal/Goal';
import { useGoalStore } from '@/stores/GoalStore';

const achievementStore = useAchievementStore();
const topicStore = useTopicStore();
const goalStore = useGoalStore();
const { achievement } = storeToRefs(achievementStore);
const { topics } = storeToRefs(topicStore);
const { goals } = storeToRefs(goalStore);
const route = useRoute();
const router = useRouter();

onMounted(() => {
    const achievementId = route.params['id'];
    goalStore.getAll();
    topicStore.getAll();
    achievementStore.getById(achievementId as string);
});

const changeTitle = (title: string): void => {
    achievementStore.updateTitle(title);
};

const handleBack = () => {
    router.push({ name: RouteNames.AchievementList });
};

const reorder = () => {
    // achievementStore.saveTopicOrder();
};

const addTopic = (topic: Topic) => {
    achievementStore.addTopic(topic);
};

const addGoal = (goal: Goal) => {
    achievementStore.addGoal(goal);
};

const deleteTopic = (topic: Topic) => {
    achievementStore.deleteTopic(topic);
};

const deleteGoal = (goal: Goal) => {
    achievementStore.deleteGoal(goal);
};

const notUsedTopics = computed(() => {
    return topics.value.filter((t) => !achievement.value?.topics?.some((a) => a._id === t._id));
});

const notUsedGoals = computed(() => {
    return goals.value.filter((g) => !achievement.value?.goals?.some((a) => a._id === g._id));
});
</script>

<template>
    <NPageHeader class="title" @back="handleBack">
        <template #title>
            <EditableHeader v-if="achievement" :title="achievement.title" @update="changeTitle" />
        </template>
    </NPageHeader>

    <NGrid x-gap="16" y-gap="16" :cols="3">
        <NGi>
            Достижение
            <NList bordered>
                <draggable
                    v-if="achievement"
                    v-model="achievement.topics"
                    item-key="_id"
                    @end="reorder"
                >
                    <template #item="{ element }">
                        <NListItem class="list-item">
                            <template #prefix>
                                <NIcon>
                                    <DotsVertical />
                                </NIcon>
                            </template>
                            <NThing :title="element.title"> </NThing>
                            <template #suffix>
                                <NButton
                                    type="error"
                                    quaternary
                                    round
                                    @click.prevent.stop="deleteTopic(element)"
                                >
                                    Убрать из достижения
                                </NButton>
                            </template>
                        </NListItem>
                    </template>
                </draggable>
                <draggable
                    v-if="achievement"
                    v-model="achievement.goals"
                    item-key="_id"
                    @end="reorder"
                >
                    <template #item="{ element }">
                        <NListItem class="list-item">
                            <template #prefix>
                                <NIcon>
                                    <DotsVertical />
                                </NIcon>
                            </template>
                            <NThing :title="element.title"> </NThing>
                            <template #suffix>
                                <NButton
                                    type="error"
                                    quaternary
                                    round
                                    @click.prevent.stop="deleteGoal(element)"
                                >
                                    Убрать из достижения
                                </NButton>
                            </template>
                        </NListItem>
                    </template>
                </draggable>
            </NList>
        </NGi>
        <NGi>
            Цели
            <NList bordered>
                <NListItem v-for="goal of notUsedGoals" :key="goal._id">
                    <NThing :title="goal.title"> </NThing>
                    <template #suffix>
                        <NButton type="info" round @click="addGoal(goal)">Добавить</NButton>
                    </template>
                </NListItem>
            </NList>
        </NGi>
        <NGi>
            Темы
            <NList bordered>
                <NListItem v-for="topic of notUsedTopics" :key="topic._id">
                    <NThing :title="topic.title"> </NThing>
                    <template #suffix>
                        <NButton type="info" round @click="addTopic(topic)">Добавить</NButton>
                    </template>
                </NListItem>
            </NList>
        </NGi>
    </NGrid>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.title {
    margin-bottom: $base * 2;
}

.list-item {
    cursor: pointer;
}
</style>
