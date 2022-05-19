<script setup lang="ts">
import { inject, reactive, onMounted } from 'vue';
import type { TopicService } from '../services/TopicService';
import type { Topic } from '@/models/Topic';
import { NList, NListItem, NButton, NSpace } from 'naive-ui';
import { useRouter } from 'vue-router';

const state = reactive<{ topics: Topic[] }>({ topics: [] });
const services = inject<{ topicService: TopicService }>('services');
const router = useRouter();

onMounted(async () => {
    let topics = await services?.topicService.getAll();
    state.topics.push(...(topics || []));
});

const editTopic = (id: string) => {
    router.push({ name: 'topic-builder', params: { id } });
};

const removeTopic = (is: string) => {
    // todo use store and service to remove topic
};
</script>

<template>
    <NList bordered>
        <NListItem v-for="topic of state.topics" :key="topic._id" @click="editTopic(topic._id)">
            {{ topic.title }}

            <template #suffix>
                <NSpace>
                    <NButton type="error" round @click.prevent="removeTopic(topic._id)"
                        >Удалить</NButton
                    >
                </NSpace>
            </template>
        </NListItem>
    </NList>
</template>
