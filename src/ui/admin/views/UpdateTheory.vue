<template>
    <TheoryForm v-if="theory" :data="theory" @save="create($event)" @cancel="navigate()" />
</template>
<script setup lang="ts">
import type { CreateTheoryDto } from '@/models/theory/dto/CreateTheoryDto';
import { useTheoryStore } from '@/stores/TheoryStore';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TheoryForm from '../components/TheoryForm.vue';
import { storeToRefs } from 'pinia';
import { RouteNames } from '@/ui/router';
import type { UpdateTheoryDto } from '@/models/theory/dto/UpdateTheoryDto';

const theoryStore = useTheoryStore();
const route = useRoute();
const router = useRouter();
const { theory } = storeToRefs(theoryStore);

onMounted(async () => {
    const theoryId = route.params['id'];
    await theoryStore.getById(theoryId as string);
});

const navigate = (): void => {
    router.push({ name: RouteNames.AdminTopicList });
};

const create = (data: CreateTheoryDto | UpdateTheoryDto): void => {
    theoryStore.create({ title: data.title, content: data.content || '' });
};
</script>
