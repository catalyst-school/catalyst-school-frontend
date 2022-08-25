import type { UserGoal } from '@/models/user-goal/UserGoal';
import { defineStore } from 'pinia';
import { useServiceStore } from './ServiceStore';
import { Stores } from './StoresEnum';

interface UserGoalRootState {
    userGoals: UserGoal[];
}

export const useUserGoalStore = defineStore(Stores.UserGoal, {
    state: (): UserGoalRootState => ({
        userGoals: [],
    }),
    actions: {
        async getAll(skipUpdate?: boolean) {
            const services = useServiceStore();
            try {
                const res = await services.userGoalService.getAll();
                if (!skipUpdate) {
                    this.userGoals = res;
                }
                return res;
            } catch (e) {
                console.error(e);
            }
        },
    },
});
