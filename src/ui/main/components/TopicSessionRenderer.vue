<script setup lang="ts">
import type { TopicSession } from '@/models/topic-session/TopicSession';
import type { Topic } from '@/models/topic/Topic';
import type { UpdateProgressDto } from '@/models/topic-session/dto/UpdateProgress.dto';

interface Props {
    topic: Topic;
    topicSession: TopicSession;
}

const emit = defineEmits<{
    (e: 'completed'): void;
    (e: 'next', event: UpdateProgressDto): void;
}>();
</script>

<template>
    <h1>{{ topic.title }}</h1>
</template>
<style scoped lang="scss">
@import '@/assets/variables.scss';
</style>
