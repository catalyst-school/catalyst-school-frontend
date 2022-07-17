<template>
    <n-spin :show="loading" size="medium">
        <n-card class="form">
            <n-tabs
                class="card-tabs"
                :default-value="currentForm"
                size="large"
                animated
                style="margin: 0 -4px"
                pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
            >
                <n-tab-pane
                    name="signin"
                    tab="Вход"
                    :disabled="successSignIn"
                    @click="currentForm = 'signin'"
                >
                    <form-login
                        @sign-in="signIn($event)"
                        @forgot-password="forgotPassword($event)"
                    />
                </n-tab-pane>
                <n-tab-pane
                    name="signup"
                    tab="Регистрация"
                    :disabled="successSignIn"
                    @click="currentForm = 'signup'"
                >
                    <div v-if="!successSignIn">
                        <form-registry @sign-up="signUp($event)"></form-registry>
                    </div>
                    <div v-if="successSignIn">
                        <n-result
                            status="success"
                            title="Регистрация успешна"
                            description="Перейдите в почту для подтверждения!"
                        ></n-result>
                    </div>
                </n-tab-pane>
            </n-tabs>
        </n-card>
    </n-spin>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { NTabPane, NCard, NTabs, NResult, NSpin, useNotification } from 'naive-ui';
import { useAuthStore } from '@/stores/AuthStore';
import router, { RouteNames } from '@/ui/router';
import { NotificationEnum } from '@/ui/shared/models/notification.enum';
import FormLogin, { type FormLoginData } from '../../shared/components/FormLogin.vue';
import FormRegistry, { type FormRegistryData } from '../../shared/components/FormRegistry.vue';

let successSignIn = ref(false);
let loading = ref(false);
let currentForm: 'signin' | 'signup' = 'signin';
const authStore = useAuthStore();
const notif = useNotification();

const signIn = async (data: FormLoginData) => {
    loading.value = true;
    const notification = await authStore.login(data);
    loading.value = false;
    if (notification?.type === NotificationEnum.SUCCESS) {
        router.push({ name: RouteNames.Main });
        nextTick();
    } else {
        notif.create({
            type: notification?.type,
            content: notification?.text,
        });
    }
};

const forgotPassword = async (email: string) => {
    loading.value = true;
    const notification = await authStore.forgotPassword(email);
    loading.value = false;
    notif.create({
        type: notification.type,
        content: notification.text,
    });
};

const signUp = async (data: FormRegistryData) => {
    loading.value = true;
    const notification = await authStore.register(data);
    loading.value = false;
    notification?.type === NotificationEnum.SUCCESS ? (successSignIn.value = true) : null;
};
</script>
<style>
.form {
    max-width: 40%;
    margin: 0 auto;
    margin-top: 150px;
}
</style>
