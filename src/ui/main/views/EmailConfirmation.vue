<template>
    <n-spin class="wrap" :show="loading" size="medium">
        <n-result :status="type" :title="text" description="Ускоряем развитие!"> </n-result>
    </n-spin>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NSpin, NResult } from 'naive-ui';
import { useAuthStore } from '@/stores/AuthStore';
import { RouteNames } from '@/ui/router';
import { NotificationEnum } from '@/ui/shared/models/notification.enum';

let loading = ref(true);
let type = ref('');
let text = ref('');
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
    const resp = await authStore.confirmEmail(route.query.token as string);
    loading.value = false;
    type.value = resp.type;
    text.value = resp.text;

    if (type.value === NotificationEnum.SUCCESS) {
        setTimeout(() => router.push({ name: RouteNames.Main }), 3000);
    }
});
</script>
<style>
.wrap {
    margin-top: 20vh;
}
</style>
