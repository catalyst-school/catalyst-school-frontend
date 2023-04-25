<script setup lang="ts">
import { Plus, Barbell, Trash } from '@vicons/tabler';
import { NListItem, NList, NThing, NIcon, NButton } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAchievementStore } from '@/stores/AchievementStore';
import { RouteNames } from '@/ui/router';
import type { Achievement } from '@/models/achievement/dto/Achievement';

const achievementStore = useAchievementStore();
const { achievements } = storeToRefs(achievementStore);
const router = useRouter();

onMounted(async () => {
    achievementStore.getAll();
});

const createAchievement = async () => {
    const newAchievement = await achievementStore.create({
        title: 'Без названия',
        topics: [],
        goals: [],
    });
    if (newAchievement) {
        editAchievement(newAchievement._id);
    }
};

const editAchievement = (id: string) => {
    router.push({ name: RouteNames.AchievementBuilder, params: { id } });
};

const removeAchievement = (id: string) => {
    achievementStore.delete(id);
};

const description = computed(() => {
    return (achievement: Achievement) =>
        `Тем: ${achievement?.topics?.length} \n Целей: ${achievement?.goals?.length}`;
});
</script>

<template>
    <NButton round type="primary" @click="createAchievement">
        <template #icon>
            <Plus />
        </template>
        Создать новое достижение
    </NButton>

    <NList bordered>
        <NListItem
            v-for="achievement of achievements"
            :key="achievement._id"
            class="list-item"
            @click="editAchievement(achievement._id)"
        >
            <NThing :title="achievement.title" content-indented>
                <template #avatar>
                    <n-avatar :style="{ background: 'white' }">
                        <n-icon color="black">
                            <Barbell />
                        </n-icon>
                    </n-avatar>
                </template>
                {{ description(achievement) }}
            </NThing>
            <template #suffix>
                <NSpace>
                    <NButton type="error" round @click.stop="removeAchievement(achievement._id)">
                        <template #icon>
                            <Trash />
                        </template>
                    </NButton>
                </NSpace>
            </template>
        </NListItem>
    </NList>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.list-item {
    cursor: pointer;
}
</style>
