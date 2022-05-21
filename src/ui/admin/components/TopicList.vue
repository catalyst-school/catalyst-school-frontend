<script setup lang="ts">
import { useTopicStore } from '@/stores/TopicStore';
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
    router.push({ name: 'topic-builder', params: { id } });
};

const removeTopic = (id: string) => {
    topicStore.remove(id);
};
</script>

<template>
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
                        Удалить
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
