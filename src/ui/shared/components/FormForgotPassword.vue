<template>
    <n-form
        ref="formForgotPassword"
        :model="modelForgotPassword"
        :rules="rulesForgotPassword"
        label-placement="left"
        require-mark-placement="right-hanging"
        label-width="auto"
    >
        <n-form-item label="Email" path="email">
            <n-input v-model:value="modelForgotPassword.email" placeholder="" />
        </n-form-item>

        <n-button
            class="button"
            attr-type="button"
            type="primary"
            size="medium"
            quaternary
            block
            @click="forgotPassword"
        >
            Восстановить
        </n-button>
    </n-form>
</template>

<script lang="ts" setup>
import {
    NButton,
    NForm,
    NFormItem,
    NInput,
    useNotification,
    type FormItemRule,
    type FormInst,
} from 'naive-ui';
import { onMounted, reactive, ref } from 'vue';
import type { LoginDto } from '@/models/auth/dto/LoginDto';
import { emailRegExp, emailValidMessage } from '@/utils/ValidationHelpers';

export type FormSignInData = LoginDto;

interface Props {
    email?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: 'save', email: string): void;
}>();

const notif = useNotification();
const formForgotPassword = ref<FormInst | null>(null);

const modelForgotPassword = reactive({
    email: '',
});

const rulesForgotPassword = {
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

onMounted(() => {
    props.email ? (modelForgotPassword.email = props.email) : null;
});

const forgotPassword = async () => {
    await formForgotPassword.value?.validate((invalidControls) => {
        if (!invalidControls) {
            emit('save', modelForgotPassword.email);
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
.button {
    width: 30%;
    margin-left: auto;
}
</style>
