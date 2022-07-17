<template>
    <n-form ref="formSignUp" :model="modelSignUp" :rules="rulesSignUp">
        <n-form-item-row label="email" path="email">
            <n-input v-model:value="modelSignUp.email" placeholder="" />
        </n-form-item-row>
        <n-form-item-row label="Пароль" path="password">
            <n-input v-model:value="modelSignUp.password" type="password" placeholder="" />
        </n-form-item-row>
        <n-form-item-row label="Повторите пароль" path="reenterPassword">
            <n-input v-model:value="modelSignUp.reenterPassword" type="password" placeholder="" />
        </n-form-item-row>
    </n-form>
    <n-space>
        <n-button attr-type="button" type="primary" block strong @click="signUp">
            Регистрация
        </n-button>
    </n-space>
</template>
<script lang="ts" setup>
import {
    NForm,
    NFormItemRow,
    NInput,
    NButton,
    NSpace,
    useNotification,
    type FormInst,
    type FormItemRule,
} from 'naive-ui';
import { emailRegExp } from '@/util-configs/Validathions';
import { ref, reactive } from 'vue';
import type { CreateUserDto } from '@/models/auth/dto/CreatUserDto';

export type FormRegistryData = CreateUserDto;

const emit = defineEmits<{
    (e: 'sign-up', data: FormRegistryData): void;
}>();

const notif = useNotification();
const formSignUp = ref<FormInst | null>(null);
const modelSignUp = reactive({
    email: '',
    password: '',
    reenterPassword: '',
});
const rulesSignUp = {
    email: {
        required: true,
        validator(_: FormItemRule, value: string) {
            const isValid = !!value?.match(emailRegExp);
            return isValid;
        },
        trigger: ['blur', 'input'],
        message: 'Введите валидный email',
    },
    password: {
        required: true,
        validator: (_: FormItemRule, value: string) => {
            const isValid = value.length > 7;
            return isValid;
        },
        trigger: ['blur', 'input'],
        message: `Должен быть не меньше 8 символов`,
    },
    reenterPassword: [
        {
            validator: (_: FormItemRule, value: string) => {
                const isValid = modelSignUp.password === value;
                return isValid;
            },
            message: 'Пароли не совпадают',
            trigger: 'input',
        },
        {
            required: true,
            trigger: ['blur', 'input'],
            message: 'Пожалуйста повторите пароль',
        },
    ],
};

const signUp = async () => {
    await formSignUp.value?.validate((invalidControls) => {
        if (!invalidControls) {
            emit('sign-up', {
                email: modelSignUp.email,
                password: modelSignUp.password,
                reenterPassword: modelSignUp.reenterPassword,
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
</script>
