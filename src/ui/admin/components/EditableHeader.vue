<script lang="ts" setup>
import { defineProps, ref, onMounted, defineEmits } from 'vue';
import { NButton, NInput } from 'naive-ui';
import { Pencil } from '@vicons/tabler';

interface Props {
    title: string;
}

const emit = defineEmits<{
    (e: 'update', value: string): void;
}>();

const editMode = ref(false);
const props = defineProps<Props>();
const value = ref('');

onMounted(() => {
    value.value = props.title;
});

const update = () => {
    editMode.value = false;
    emit('update', value.value);
};
</script>

<template>
    <template v-if="editMode">
        <div class="form">
            <NInput v-model:value="value" class="input" type="text" />
            <NButton quaternary circle @click="update">Ok</NButton>
        </div>
    </template>
    <template v-else>
        <span class="title">{{ props.title }}</span>
        <NButton quaternary circle size="small" @click="editMode = true">
            <template #icon><Pencil /></template>
        </NButton>
    </template>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';
.form {
    display: flex;
}
.input {
    margin-right: $base;
}

.title {
    white-space: nowrap;
}
</style>
