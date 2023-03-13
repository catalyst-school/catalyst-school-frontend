<script setup lang="ts">
import type { Topic } from '@/models/topic/Topic';
import { useTopicSessionStore } from '@/stores/TopicSessionStore';
import { useTopicStore } from '@/stores/TopicStore';
import { RouteNames } from '@/ui/router';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TopicSessionRenderer from '../components/TopicSessionRenderer.vue';
import type { UpdateProgressDto } from '@/models/topic-session/dto/UpdateProgress.dto';

const topicSessionStore = useTopicSessionStore();
const topicStore = useTopicStore();
const route = useRoute();
const router = useRouter();
const topic = ref<Topic>();

const { topicSession } = storeToRefs(topicSessionStore);

onMounted(async () => {
    await topicSessionStore.getById(route.params['id'] as string);
    if (topicSession?.value?.topic) {
        topic.value = await topicStore.getById(topicSession.value.topic, true);
    }
});

const nextUnit = async (event: UpdateProgressDto) => {
    // todo next step applied only after this call
    await topicSessionStore.checkUnit(topicSession.value?._id as string, event);
};

const completeTopic = () => {
    router.push({ name: RouteNames.Home });
};
</script>

<template>
    <TopicSessionRenderer
        v-if="topic && topicSession"
        :topic="topic"
        :topic-session="topicSession"
        @completed="completeTopic"
        @next="nextUnit($event)"
    />
</template>
<style scoped lang="scss">
@import '@/assets/variables.scss';
</style>
