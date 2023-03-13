<template>
    <TheoryForm @save="create($event)" @cancel="navigate()" />
</template>
<script setup lang="ts">
import type { CreateTheoryDto } from '@/models/theory/dto/CreateTheoryDto';
import { useTheoryStore } from '@/stores/TheoryStore';
import TheoryForm from '../components/TheoryForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { RouteNames } from '@/ui/router';
import type { UpdateTheoryDto } from '@/models/theory/dto/UpdateTheoryDto';
import { useTopicStore } from '@/stores/TopicStore';
import { UnitType } from '@/models/topic/Unit';

const theoryStore = useTheoryStore();
const topicStore = useTopicStore();
const router = useRouter();
const route = useRoute();

const topicId = route.query.topicId as string;
const sectionId = route.query.sectionId as string;

const navigate = (): void => {
    if (topicId) {
        router.push({ name: RouteNames.AdminTopicBuilder, params: { id: topicId } });
    } else {
        router.push({ name: RouteNames.AdminTopicList });
    }
};

const create = async (data: CreateTheoryDto | UpdateTheoryDto): Promise<void> => {
    const theory = await theoryStore.create({ title: data.title, content: data.content || '' });

    if (theory && sectionId) {
        await topicStore.addUnit({ ref: theory._id, type: UnitType.Theory });
    }

    navigate();
};
</script>
