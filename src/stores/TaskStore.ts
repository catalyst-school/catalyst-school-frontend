import type { Task } from '@/models/task/Task';
import { defineStore } from 'pinia';
import { useServiceStore } from './ServiceStore';
import { Stores } from './StoresEnum';

interface TaskRootState {
    tasks: Task[];
}

export const useTaskStore = defineStore(Stores.Task, {
    state: (): TaskRootState => ({
        tasks: [],
    }),
    actions: {
        async getAll() {
            const services = useServiceStore();
            try {
                this.tasks = await services.taskService.getAll();
            } catch (e) {
                console.error(e);
            }
        },
    },
});
