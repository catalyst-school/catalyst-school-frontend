<script setup lang="ts">
import { useUserGoalStore } from '@/stores/UserGoalStore';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import { NButton } from 'naive-ui';
import { useTopicSessionStore } from '@/stores/TopicSessionStore';
import { useRouter } from 'vue-router';
import { RouteNames } from '@/ui/router';

const userGoalStore = useUserGoalStore();
const topicSessionStore = useTopicSessionStore();
const { userGoals } = storeToRefs(userGoalStore);
const router = useRouter();

onMounted(async () => {
    await userGoalStore.getAll();
});

const startTopicSession = async (topic: string, userGoal: string) => {
    const topicSession = await topicSessionStore.create({ topic, userGoal });
    router.push({ name: RouteNames.TopicSession, params: { id: topicSession?._id } });
};

const continueTopicSession = (topicSessionId: string) => {
    router.push({ name: RouteNames.TopicSession, params: { id: topicSessionId } });
};

let mainUserGoal = computed(() => userGoals.value[0]);
</script>

<template>
    <h2>{{ mainUserGoal?.goal?.title }}</h2>
    <p v-for="(topic, index) of mainUserGoal?.goal?.topics" :key="topic._id">
        {{ topic.title }}
        <NButton
            v-if="!mainUserGoal.currentSession && index === 0"
            @click="startTopicSession(topic._id, mainUserGoal._id)"
        >
            Начать обучение
        </NButton>
        <NButton
            v-if="topic._id === mainUserGoal.currentSession?.topic"
            @click="continueTopicSession(mainUserGoal.currentSession._id)"
        >
            Продолжить обучение
        </NButton>
    </p>
</template>
<style scoped lang="scss">
@import '@/assets/variables.scss';
</style>
