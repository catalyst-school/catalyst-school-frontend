<script setup lang="ts">
import { useUserGoalStore } from '@/stores/UserGoalStore';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';

const userGoalStore = useUserGoalStore();
const { userGoals } = storeToRefs(userGoalStore);

onMounted(async () => {
    await userGoalStore.getAll();
});

let mainUserGoal = computed(() => userGoals.value[0]);
</script>

<template>
    <h2>{{ mainUserGoal?.goal?.title }}</h2>
    <p v-for="topic of mainUserGoal?.goal?.topics" :key="topic._id">
        {{ topic.title }}
        <i v-if="topic._id === mainUserGoal.currentTopic"> - Текущий</i>
    </p>
</template>
<style scoped lang="scss">
@import '@/assets/variables.scss';
</style>
