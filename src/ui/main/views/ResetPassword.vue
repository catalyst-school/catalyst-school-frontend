<template>
    <n-spin class="wrap" :show="loading" size="medium">
        <n-result v-if="type" :status="type" :title="text" description="Ускоряем развитие!" />
        <FormResetPassword v-if="!type" @save="reset" />
    </n-spin>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import FormResetPassword, {
    type resetPassword,
} from '@/ui/shared/components/FormResetPassworld.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRoute, useRouter } from 'vue-router';
import { RouteNames } from '@/ui/router';
import { NotificationEnum } from '@/ui/shared/models/notification.enum';
import { NResult, NSpin } from 'naive-ui';

let loading = ref(false);
let type = ref('');
let text = ref('');
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const reset = async (resetData: resetPassword): Promise<void> => {
    loading.value = true;
    const resp = await authStore.resetPassword(route.query.token as string, resetData.password);

    loading.value = false;
    type.value = resp.type;
    text.value = resp.text;

    if (type.value === NotificationEnum.SUCCESS) {
        setTimeout(() => router.push({ name: RouteNames.Main }), 3000);
    }
};
</script>
<style>
.wrap {
    margin-top: 20vh;
}
</style>
