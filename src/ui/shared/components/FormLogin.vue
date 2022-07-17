<template>
    <n-form
        ref="formSignIn"
        :model="modelSignIn"
        :rules="rulesSignIn"
        label-placement="left"
        require-mark-placement="right-hanging"
        label-width="auto"
    >
        <n-form-item label="email" path="email">
            <n-input v-model:value="modelSignIn.email" placeholder="" />
        </n-form-item>

        <n-form-item label="Пароль" path="password">
            <n-input v-model:value="modelSignIn.password" placeholder="" />
        </n-form-item>
    </n-form>
    <n-space align="center">
        <n-button attr-type="button" type="primary" size="medium" block strong @click="signIn">
            Войти
        </n-button>
        <n-button attr-type="button" size="medium" quaternary block @click="forgotPassword">
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
    type FormItemRule,
    type FormInst,
} from 'naive-ui';
import { reactive, ref } from 'vue';
import { emailRegExp } from '@/util-configs/Validathions';
import type { LoginDto } from '@/models/auth/dto/LoginDto';

export type FormLoginData = LoginDto;

const emit = defineEmits<{
    (e: 'sign-in', data: FormLoginData): void;
    (e: 'forgot-password', email: string): void;
}>();
const notif = useNotification();
const formSignIn = ref<FormInst | null>(null);

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
        message: 'Введите валидный email',
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

const forgotPassword = async () => {
    if (!modelSignIn.email.match(emailRegExp)) {
        notif.create({
            type: 'error',
            content: 'Введите email',
        });
    } else {
        emit('forgot-password', modelSignIn.email);
    }
};
</script>
