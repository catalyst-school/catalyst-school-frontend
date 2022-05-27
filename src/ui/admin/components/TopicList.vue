<script setup lang="ts">
import { useTopicStore } from '@/stores/TopicStore';
import { RouteNames } from '@/ui/router';
import { Plus, Trash } from '@vicons/tabler';
import { NButton, NList, NListItem, NSpace, NThing } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

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
    const newTopic = await topicStore.create({ title: 'Без названия', sections: [] });
    if (newTopic) {
        editTopic(newTopic._id);
    }
};
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
            <NThing :title="topic.title"> </NThing>
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
