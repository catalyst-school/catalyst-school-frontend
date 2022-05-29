<script lang="ts" setup>
import AdminMenu from '@/ui/admin/components/AdminMenu.vue';
import { RouterView } from 'vue-router';
import Quill from 'quill';
import ImageEdit from 'quill-image-edit-module';

Quill.register('modules/imageEdit', ImageEdit);
</script>

<template>
    <AdminMenu />
    <main>
        <RouterView />
    </main>
</template>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

main {
    padding: $base * 2;
    background-color: var(--main-red);
}
</style>
