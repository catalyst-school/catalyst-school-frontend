<template>
    <form class="form">
        <n-button type="success" @click="save()">Сохранить</n-button>
        <n-button @click="cancel()">Отмена</n-button>
        <n-input v-model:value="title" />
        <div id="toolbar"></div>
        <div id="editor"></div>
    </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Quill from 'quill';
import { NButton, NInput } from 'naive-ui';
import type { UpdateTheoryDto } from '@/models/theory/dto/UpdateTheoryDto';
import type { CreateTheoryDto } from '@/models/theory/dto/CreateTheoryDto';
import type { Theory } from '@/models/theory/Theory';
import { toolbarOptions, imageEditOptions } from '@/quill-configs';

interface Props {
    data: Theory;
}

let editor: Quill;
let title = ref('');

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: 'save', form: UpdateTheoryDto | CreateTheoryDto): void;
    (e: 'close'): void;
}>();

onMounted(() => {
    editor = new Quill('#editor', {
        modules: {
            toolbar: toolbarOptions,
            imageEdit: imageEditOptions,
        },
        theme: 'snow',
    });

    if (props.data) {
        title.value = props.data.title || '';
        editor.setContent(props.data.content);
    }
});

const save = (): void => {
    const content = editor.getContents();
    if (props.data._id) {
        emit('save', { title: title.value, content: content });
    }
};

const cancel = (): void => {
    emit('close');
};
</script>

<style scoped>
.form {
    max-width: 80%;
    margin: 0 auto;
}
</style>
