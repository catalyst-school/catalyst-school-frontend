<script setup lang="ts">
import type { Goal } from '@/models/goal/Goal';
import HeaderComponentVue from '../components/HeaderComponent.vue';
import GoalComponent from '../components/GoalComponent.vue';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useGoalStore } from '@/stores/GoalStore';
import { useRouter } from 'vue-router';
import { useUserGoalStore } from '@/stores/UserGoalStore';
import { RouteNames } from '@/ui/router';

const goalStore = useGoalStore();
const userGoalStore = useUserGoalStore();
const { goals } = storeToRefs(goalStore);
const router = useRouter();

onMounted(() => {
    goalStore.getAll();
});

const selectGoal = async (id: Goal['_id']) => {
    await userGoalStore.create({ goal: id });
    router.push({ name: RouteNames.Home });
};
</script>

<template>
    <HeaderComponentVue />
    <div class="title">ЧЕМУ ТЫ ХОЧЕШЬ НАУЧИТЬСЯ?</div>
    <div v-for="goal of goals" :key="goal._id" class="goals-wrap">
        <GoalComponent :goal="goal" @select="selectGoal($event)" />
    </div>
</template>

<style scoped lang="scss">
.title {
    font-size: 70px;
    font-weight: bold;
    color: #ffae12;
    width: 1200px;
    margin: 0 auto;
    margin-top: 100px;
}
</style>
