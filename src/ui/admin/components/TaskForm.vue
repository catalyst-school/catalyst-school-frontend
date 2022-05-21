<template>
    <n-space vertical>
        <n-input v-model:value="form.title" placeholder="Наименование" />
        <n-input
            v-model:value="form.text"
            placeholder="Текст"
            type="textarea"
            size="small"
            :autosize="{
                minRows: 6,
                maxRows: 10,
            }"
        />

        <n-space horizontal>
            <n-button type="success" @click="onPositiveClick()"> Сохранить </n-button>
            <n-button @click="onNegativeClick()"> Отменить </n-button>
        </n-space>
    </n-space>
</template>

<script setup lang="ts">
import { NInput, NSpace, NButton } from 'naive-ui';
import { reactive } from 'vue';

interface Form {
    title: string;
    text: string;
}

const props = defineProps<{
    formData?: Form;
}>();

const emit = defineEmits<{
    (e: 'save', form: Form): void;
    (e: 'close'): void;
}>();

const form: Form = reactive({
    text: '',
    title: '',
});

const onPositiveClick = (): void => {
    emit('save', form);
};
const onNegativeClick = (): void => {
    emit('close');
};
</script>
