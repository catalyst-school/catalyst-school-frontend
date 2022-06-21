<template>
    <ConfirmDialog
        v-if="showConfirm"
        :title="'Удалить?'"
        :content="'Вы действительно хотите удалить?'"
        :positive-text="'Да'"
        :negative-text="'Нет'"
    />
    <form class="form">
        <n-space>
            <n-button class="form__button" round type="primary" @click="save()">
                <template #icon>
                    <Plus />
                </template>
                Сохранить
            </n-button>
            <n-button class="form__button" round @click="cancel()">
                <template #icon><ArrowBack /></template>
                В конструктор
            </n-button>
            <n-button class="form__button" round @click="showConfirm = true">
                <template #icon><TrashX /></template>
                Удалить
            </n-button>
        </n-space>

        <n-input
            v-model:value="title"
            class="form__input form__input--title"
            placeholder="Заголовок"
        />
        <div class="wrap-editor">
            <div id="toolbar"></div>
            <div id="editor"></div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Quill from 'quill';
import { NButton, NInput, NSpace } from 'naive-ui';
import { Plus, ArrowBack, TrashX } from '@vicons/tabler';
import type { UpdateTheoryDto } from '@/models/theory/dto/UpdateTheoryDto';
import type { CreateTheoryDto } from '@/models/theory/dto/CreateTheoryDto';
import type { Theory } from '@/models/theory/Theory';
import { toolbarOptions, imageEditOptions } from '@/util-configs/quill-configs';
import ConfirmDialog from '@/ui/main/components/ConfirmDialog.vue';

interface Props {
    theory?: Theory | null;
}

let editor: Quill;
let title = ref('');
let showConfirm = ref(false);

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: 'save', form: CreateTheoryDto | UpdateTheoryDto): void;
    (e: 'cancel'): void;
}>();

onMounted((): void => {
    editor = new Quill('#editor', {
        modules: {
            toolbar: toolbarOptions,
            imageEdit: imageEditOptions,
        },
        placeholder: 'Описание...',
        theme: 'snow',
    });

    if (props.theory) {
        title.value = props.theory.title || '';
        editor.setContents(JSON.parse(props.theory.content));
    }
});

const save = (): void => {
    const content = JSON.stringify(editor.getContents());
    emit('save', { title: title.value, content: content });
};

const cancel = (): void => {
    emit('cancel');
};
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';
.form {
    max-width: 80%;
    margin: 0 auto;

    &__button,
    &__input {
        margin-bottom: $base * 2;

        &--title {
            width: 600px;
        }
    }
}

#editor {
    min-height: 200px;
}
</style>
