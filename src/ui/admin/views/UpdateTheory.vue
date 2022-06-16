<template>
    <TheoryForm v-if="theory" :data="theory" @save="update($event)" @cancel="navigate()" />
</template>
<script setup lang="ts">
import type { CreateTheoryDto } from '@/models/theory/dto/CreateTheoryDto';
import { useTheoryStore } from '@/stores/TheoryStore';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TheoryForm from '../components/TheoryForm.vue';
import { storeToRefs } from 'pinia';
import type { UpdateTheoryDto } from '@/models/theory/dto/UpdateTheoryDto';
import { RouteNames } from '@/ui/router';

const theoryStore = useTheoryStore();
const route = useRoute();
const router = useRouter();
const { theory } = storeToRefs(theoryStore);

const topicId = route.query.topicId as string;

let theoryId: string;

onMounted(async (): Promise<void> => {
    theoryId = route.params['id'] as string;
    await theoryStore.getById(theoryId);
});

const navigate = (): void => {
    if (topicId) {
        router.push({ name: RouteNames.AdminTopicBuilder, params: { id: topicId } });
    } else {
        router.push({ name: RouteNames.AdminTopicList });
    }
};

const update = async (data: CreateTheoryDto | UpdateTheoryDto): Promise<void> => {
    await theoryStore.update(theoryId, { title: data.title, content: data.content || '' });
    navigate();
};
</script>
