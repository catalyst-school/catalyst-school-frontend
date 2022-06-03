<template>
    <TheoryForm @save="create($event)" @cancel="navigate()" />
</template>
<script setup lang="ts">
import type { CreateTheoryDto } from '@/models/theory/dto/CreateTheoryDto';
import { useTheoryStore } from '@/stores/TheoryStore';
import TheoryForm from '../components/TheoryForm.vue';
import { useRouter } from 'vue-router';
import { RouteNames } from '@/ui/router';
import type { UpdateTheoryDto } from '@/models/theory/dto/UpdateTheoryDto';

const theoryStore = useTheoryStore();
const router = useRouter();

const create = (data: CreateTheoryDto | UpdateTheoryDto): void => {
    theoryStore.create({ title: data.title, content: data.content || '' });
};

const navigate = (): void => {
    router.push({ name: RouteNames.AdminTopicList });
};
</script>
