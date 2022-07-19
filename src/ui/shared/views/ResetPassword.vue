<template>
    <n-spin class="wrap" :show="loading" size="medium">
        <n-result
            v-if="typeResult"
            :status="typeResult"
            :title="textResult"
            description="Ускоряем развитие!"
        />
        <FormResetPassword v-if="!typeResult" @save="reset" />
    </n-spin>
</template>
<script lang="ts" setup>
import { ref, type Ref } from 'vue';

import { useAuthStore } from '@/stores/AuthStore';
import { useRoute, useRouter } from 'vue-router';
import { RouteNames } from '@/ui/router';
import { Notification } from '@/ui/shared/models/Notification.enum';
import { NResult, NSpin } from 'naive-ui';
import FormResetPassword, {
    type ResetPassword,
} from '@/ui/shared/components/FormResetPassword.vue';

let loading = ref(false);
let typeResult: Ref<Notification | undefined> = ref();
let textResult = ref('');
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const reset = async (resetData: ResetPassword): Promise<void> => {
    loading.value = true;
    const resp = await authStore.resetPassword(route.query.token as string, resetData.password);

    loading.value = false;
    typeResult.value = resp.type;
    textResult.value = resp.text;

    if (typeResult.value === Notification.SUCCESS) {
        setTimeout(() => router.push({ name: RouteNames.Main }), 3000);
    }
};
</script>
<style>
.wrap {
    margin-top: 20vh;
}
</style>
