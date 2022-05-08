<script setup lang="ts">
import { NThing, NAvatar, NIcon, NButton, NSpace } from 'naive-ui';
import { Book } from '@vicons/tabler';

interface TheoryUnit {
    title: string;
    content: string;
}

const props = defineProps<TheoryUnit>();
</script>

<template>
    <NThing content-indented>
        <template #avatar>
            <NAvatar>
                <NIcon>
                    <Book />
                </NIcon>
            </NAvatar>
        </template>
        <template #header>{{ props?.title }}</template>
        <template #description>Описание</template>

        {{ props?.content }}
    </NThing>
</template>
