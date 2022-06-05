<script lang="ts" setup>
import { RouterView } from 'vue-router';
import Quill from 'quill';
import ImageEdit from 'quill-image-edit-module';
Quill.register('modules/imageEdit', ImageEdit);
</script>

<template>
    <RouterView />
</template>
