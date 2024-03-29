<template>
    <n-modal
        v-model:show="forgotPasswordModal"
        class="modal"
        :mask-closable="false"
        preset="dialog"
    >
        <template #header>
            <div>Ваш Email</div>
        </template>
        <div><form-forgot-password :email="modelSignIn.email" @save="forgotPassword" /></div>
    </n-modal>
    <n-form
        ref="formSignIn"
        :model="modelSignIn"
        :rules="rulesSignIn"
        label-placement="left"
        require-mark-placement="right-hanging"
        label-width="auto"
    >
        <n-form-item label="Email" path="email">
            <n-input v-model:value="modelSignIn.email" placeholder="" />
        </n-form-item>

        <n-form-item label="Пароль" path="password">
            <n-input v-model:value="modelSignIn.password" type="password" placeholder="" />
        </n-form-item>
    </n-form>
    <n-space align="center">
        <n-button attr-type="button" type="primary" size="medium" block strong @click="signIn">
            Войти
        </n-button>
        <n-button
            attr-type="button"
            size="medium"
            quaternary
            block
            @click="forgotPasswordModal = true"
        >
            Забыли пароль
        </n-button>
    </n-space>
</template>

<script lang="ts" setup>
import {
    NForm,
    NFormItem,
    NInput,
    NButton,
    NSpace,
    useNotification,
    NModal,
    type FormItemRule,
    type FormInst,
} from 'naive-ui';
import { reactive, ref } from 'vue';
import type { LoginDto } from '@/models/auth/dto/LoginDto';
import { emailRegExp, emailValidMessage } from '@/utils/ValidationHelpers';
import FormForgotPassword from './FormForgotPassword.vue';

export type FormSignInData = LoginDto;

const emit = defineEmits<{
    (e: 'sign-in', data: FormSignInData): void;
    (e: 'forgot-password', email: string): void;
}>();
const notif = useNotification();
const formSignIn = ref<FormInst | null>(null);
const forgotPasswordModal = ref(false);

const modelSignIn = reactive({
    email: '',
    password: '',
});

const rulesSignIn = {
    email: {
        required: true,
        validator(_: FormItemRule, value: string) {
            const isValid = !!value?.match(emailRegExp);
            return isValid;
        },
        trigger: ['blur', 'input'],
        message: emailValidMessage,
    },
    password: [
        {
            required: true,
            message: 'Введите пароль',
            trigger: ['input', 'blur'],
        },
    ],
};

const signIn = async () => {
    await formSignIn.value?.validate((invalidControls) => {
        if (!invalidControls) {
            emit('sign-in', {
                password: modelSignIn.password,
                email: modelSignIn.email,
            });
        } else {
            invalidControls.forEach((controlErrors) => {
                controlErrors.forEach((error) => {
                    notif.create({
                        type: 'error',
                        content: error.message,
                    });
                });
            });
        }
    });
};

const forgotPassword = (email: string) => {
    emit('forgot-password', email);
    forgotPasswordModal.value = false;
};
</script>
<style>
.modal {
    margin-top: 14%;
}
</style>
