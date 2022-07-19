<template>
    <div class="form">
        <n-form ref="formResetPassword" :model="modelResetPassword" :rules="rulesSignUp">
            <n-form-item-row label="Пароль" path="password">
                <n-input
                    v-model:value="modelResetPassword.password"
                    placeholder=""
                    type="password"
                />
            </n-form-item-row>
            <n-form-item-row label="Повторите пароль" path="reenterPassword">
                <n-input
                    v-model:value="modelResetPassword.reenterPassword"
                    type="password"
                    placeholder=""
                />
            </n-form-item-row>
        </n-form>
        <n-space>
            <n-button attr-type="button" type="primary" block strong @click="save">
                Установить
            </n-button>
        </n-space>
    </div>
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
import { ref, reactive } from 'vue';
import type { ResetPasswordDto } from '@/models/auth/dto/ResetPasswordDto';
import {
    passwordLengMessage,
    passwordReenterMessage,
    passwordsDoNotMatch,
} from '@/utils/ValidationHelpers';

export type ResetPassword = ResetPasswordDto;

const emit = defineEmits<{
    (e: 'save', data: ResetPassword): void;
}>();

const notif = useNotification();
const formResetPassword = ref<FormInst | null>(null);
const modelResetPassword = reactive({
    password: '',
    reenterPassword: '',
});
const rulesSignUp = {
    password: {
        required: true,
        validator: (_: FormItemRule, value: string) => {
            const isValid = value.length > 7;
            return isValid;
        },
        trigger: ['blur', 'input'],
        message: passwordLengMessage,
    },
    reenterPassword: [
        {
            validator: (_: FormItemRule, value: string) => {
                const isValid = modelResetPassword.password === value;
                return isValid;
            },
            message: passwordsDoNotMatch,
            trigger: 'input',
        },
        {
            required: true,
            trigger: ['blur', 'input'],
            message: passwordReenterMessage,
        },
    ],
};

const save = async () => {
    await formResetPassword.value?.validate((invalidControls) => {
        if (!invalidControls) {
            emit('save', {
                password: modelResetPassword.password,
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
<style scoped lang="scss">
.form {
    margin: 0 auto;
    margin-top: 20vh;
    width: 20%;
}
</style>
