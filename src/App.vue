<script lang="ts" setup>
import { RouterView } from 'vue-router';
import Quill from 'quill';
import { NNotificationProvider } from 'naive-ui';
import ImageEdit from 'quill-image-edit-module';
Quill.register('modules/imageEdit', ImageEdit);
</script>

<template>
    <n-notification-provider>
        <RouterView />
    </n-notification-provider>
</template>
