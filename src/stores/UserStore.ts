import type { User } from '@/models/user/User';
import { defineStore } from 'pinia';
import { useServiceStore } from './ServiceStore';

import { Stores } from './StoresEnum';

interface UserRootState {
    currentUser: null | User;
}

export const useUserStore = defineStore(Stores.User, {
    state: (): UserRootState => ({
        currentUser: null,
    }),
    actions: {
        async getProfile(): Promise<User | null> {
            const services = useServiceStore();

            this.currentUser = await services.userService.getProfile();
            return this.currentUser;
        },
    },
});
