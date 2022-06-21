<template>
    <n-modal
        v-model:show="showModal"
        :mask-closable="false"
        preset="dialog"
        :title="props.title"
        :content="props.content"
        :positive-text="props.positiveText"
        :negative-text="props.negativeText"
        @positive-click="onPositiveClick"
        @negative-click="onNegativeClick"
    />
</template>
<script setup lang="ts">
import { NModal } from 'naive-ui';
import { ref } from 'vue';

interface Props {
    title: string;
    content: string; // Вы действительно хотите удалить?
    positiveText: string;
    negativeText: string;
}

const props = defineProps<Props>();

const showModal = ref(true);

const onPositiveClick = (): void => {
    showModal.value = false;
};
const onNegativeClick = (): void => {
    showModal.value = false;
};
</script>
