<script setup lang="ts">
import { useGoalStore } from '@/stores/GoalStore';
import { RouteNames } from '@/ui/router';
import { NPageHeader } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EditableHeader from './EditableHeader.vue';

const goalStore = useGoalStore();
const { goal } = storeToRefs(goalStore);
const route = useRoute();
const router = useRouter();

onMounted(() => {
    const topicId = route.params['id'];
    goalStore.getById(topicId as string);
});

const changeTitle = (title: string): void => {
    goalStore.updateTitle(goal.value?._id as string, title);
};

const handleBack = () => {
    router.push({ name: RouteNames.AdminGoalList });
};
</script>

<template>
    <NPageHeader class="title" @back="handleBack">
        <template #title>
            <EditableHeader v-if="goal" :title="goal.title" @update="changeTitle" />
        </template>
    </NPageHeader>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.title {
    margin-bottom: $base * 2;
}
</style>
