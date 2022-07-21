<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { RouteNames } from '@/ui/router';
import { NButton } from 'naive-ui';
import { nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { NDropdown } from 'naive-ui';

const authStore = useAuthStore();
const router = useRouter();
const { isLoggedIn } = authStore;

const login = () => {
    router.push({ name: RouteNames.Login });
};

const logout = () => {
    authStore.logout();
    router.push({ name: RouteNames.Login });
    nextTick();
};

const options = [
    {
        label: 'Выйти',
        props: {
            onClick: () => logout(),
        },
    },
];
</script>

<template>
    <div class="auth-buttons">
        <n-button v-if="!isLoggedIn" round @click="login">Войти</n-button>
        <div v-else>
            <n-dropdown trigger="click" :options="options" placement="top-end">
                <n-button quaternary>Имя Пользователя</n-button>
            </n-dropdown>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import '@/assets/variables.scss';

.auth-buttons {
    margin: {
        top: $base;
        right: $base * 2;
    }
}
</style>
