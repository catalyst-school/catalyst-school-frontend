<script setup lang="ts">
import { useGoalStore } from '@/stores/GoalStore';
import { RouteNames } from '@/ui/router';
import { NPageHeader, NListItem, NList, NThing, NIcon, NGrid, NGi, NButton } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { DotsVertical } from '@vicons/tabler';
import { onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTopicStore } from '@/stores/TopicStore';
import type { Topic } from '@/models/topic/Topic';
import EditableHeader from './EditableHeader.vue';
import ImageFile from '../components/ImageFile.vue';
import * as draggable from 'vuedraggable';

const goalStore = useGoalStore();
const topicStore = useTopicStore();
const { goal } = storeToRefs(goalStore);
const { topics } = storeToRefs(topicStore);
const route = useRoute();
const router = useRouter();

onMounted(() => {
    const topicId = route.params['id'];
    goalStore.getById(topicId as string);
    topicStore.getAll();
});

const changeTitle = (title: string): void => {
    goalStore.updateTitle(title);
};

const handleBack = () => {
    router.push({ name: RouteNames.AdminGoalList });
};

const reorder = () => {
    goalStore.saveTopicOrder();
};

const addTopic = (topic: Topic) => {
    goalStore.addTopic(topic);
};

const removeTopic = (topic: Topic) => {
    goalStore.removeTopic(topic);
};

const changeImg = (fileUrl: string): void => {
    goalStore.updateImg(fileUrl);
};

const notUsedTopics = computed(() => {
    return topics.value.filter((t) => !goal.value?.topics?.some((gt) => gt._id === t._id));
});
</script>

<template>
    <NPageHeader class="title-wrap" @back="handleBack">
        <template #title>
            <div class="title">
                <EditableHeader v-if="goal" :title="goal.title" @update="changeTitle" />
                <ImageFile v-if="goal" @update="changeImg"></ImageFile>
            </div>
        </template>
    </NPageHeader>

    <NGrid x-gap="16" y-gap="16" :cols="2">
        <NGi>
            <NList bordered>
                <draggable v-if="goal" v-model="goal.topics" item-key="_id" @end="reorder">
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
                                    @click.prevent.stop="removeTopic(element)"
                                >
                                    Убрать из цели
                                </NButton>
                            </template>
                        </NListItem>
                    </template>
                </draggable>
            </NList>
        </NGi>
        <NGi>
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

.title-wrap {
    margin-bottom: $base * 2;
}

.title {
    display: flex;
    align-items: center;
}

.list-item {
    cursor: pointer;
}
</style>
