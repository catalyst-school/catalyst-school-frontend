<script setup lang="ts">
import type { Goal } from '@/models/goal/Goal';
import { useGoalStore } from '@/stores/GoalStore';
import { useUserGoalStore } from '@/stores/UserGoalStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const userGoalStore = useUserGoalStore();
const { userGoals } = storeToRefs(userGoalStore);

onMounted(async () => {
    await userGoalStore.getAll();
});
</script>

<template>
    <h2>{{ userGoals[0]?.goal?.title }}</h2>
    <p v-for="topic of userGoals[0]?.goal?.topics" :key="topic._id">{{ topic.title }}</p>
</template>
<style scoped lang="scss">
@import '@/assets/variables.scss';
</style>
