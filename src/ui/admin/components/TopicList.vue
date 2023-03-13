<script setup lang="ts">
import type { Topic } from '@/models/topic/Topic';
import { useTopicStore } from '@/stores/TopicStore';
import { RouteNames } from '@/ui/router';
import { Plus, Trash, Books } from '@vicons/tabler';
import { NButton, NList, NListItem, NSpace, NThing, NAvatar, NIcon } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { UnitType } from '@/models/topic/Unit';

const topicStore = useTopicStore();
const { topics } = storeToRefs(topicStore);
const router = useRouter();

onMounted(async () => {
    topicStore.getAll();
});

const editTopic = (id: string) => {
    router.push({ name: RouteNames.AdminTopicBuilder, params: { id } });
};

const removeTopic = (id: string) => {
    topicStore.remove(id);
};

const createTopic = async () => {
    const newTopic = await topicStore.create({ title: 'Без названия', units: [] });
    if (newTopic) {
        editTopic(newTopic._id);
    }
};

const description = computed(() => {
    return (topic: Topic) => {
        let result = `Юнитов: ${topic?.units?.length}. `;
        const theories = topic?.units?.filter((u) => u.type === UnitType.Theory)?.length;
        const trainings = topic?.units?.filter((s) => s.type === UnitType.Task)?.length;

        result += theories ? `Теорий - ${theories}. ` : '';
        result += trainings ? `Тренажёров - ${trainings}. ` : '';

        return result;
    };
});
</script>

<template>
    <NButton round type="primary" @click="createTopic">
        <template #icon>
            <Plus />
        </template>
        Создать новую тему
    </NButton>

    <NList bordered>
        <NListItem
            v-for="topic of topics"
            :key="topic._id"
            class="list-item"
            @click="editTopic(topic._id)"
        >
            <NThing :title="topic.title" content-indented>
                <template #avatar>
                    <n-avatar :style="{ background: 'white' }">
                        <n-icon color="black">
                            <Books />
                        </n-icon>
                    </n-avatar>
                </template>
                {{ description(topic) }}
            </NThing>
            <template #suffix>
                <NSpace>
                    <NButton type="error" round @click.stop="removeTopic(topic._id)">
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
