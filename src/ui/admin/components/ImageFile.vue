<script lang="ts" setup>
import { NUpload, UploadFileInfo } from 'naive-ui/lib/upload';
import { NButton } from 'naive-ui';
import { AttachFileFilled } from '@vicons/material';
import { defineEmits } from 'vue';

const emit = defineEmits<{
    (e: 'update', value: string): void;
}>();

const API_URL_UPLOAD = `${import.meta.env.VITE_API_URL}/files/upload`;
const acceptFileType = 'image/*,.png,.jpg,.gif,.web';
const fileLimit = 1;

const finish = (options: { file: UploadFileInfo; event?: Event }): void => {
    emit('update', `${options.file.id}_${options.file.name}`);
};

const data = (options: { file: UploadFileInfo }): { id: string } => {
    return { id: options.file.id };
};
</script>

<template>
    <NUpload
        class="wrap"
        :accept="acceptFileType"
        :action="API_URL_UPLOAD"
        :max="fileLimit"
        :data="data"
        @finish="finish"
    >
        <NButton quaternary circle size="small">
            <template #icon><AttachFileFilled /></template>
        </NButton>
    </NUpload>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';
.wrap {
    display: flex;
    align-items: center;
}
</style>
