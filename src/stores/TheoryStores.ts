import type { CreateTheoryDto } from '@/models/theory/dto/CreateTheoryDto';
import type { UpdateTheoryDto } from '@/models/theory/dto/UpdateTheoryDto';
import type { Theory } from '@/models/theory/Theory';
import { isTemplateNode } from '@vue/compiler-core';
import { defineStore } from 'pinia';
import { useServiceStore } from './ServiceStore';
import { Stores } from './StoresEnum';

interface TheoryRootState {
    theories: Theory[];
    theory: Theory | null;
}

export const useTopicStore = defineStore(Stores.Topic, {
    state: (): TheoryRootState => ({
        theory: null,
        theories: [],
    }),
    actions: {
        async create(theory: CreateTheoryDto) {
            const services = useServiceStore();
            try {
                const newTheory = await services.theoryService.create(theory);
                this.theories.push(newTheory);
            } catch (e) {
                console.error(e);
            }
        },
        async update(id: string, theory: UpdateTheoryDto) {
            const services = useServiceStore();
            try {
                const updateTheory = await services.theoryService.update(id, theory);
                const index = this.theories.findIndex((t) => t._id === id);
                this.theories[index] = updateTheory;
            } catch (e) {
                console.error(e);
            }
        },
        async getAll() {
            const services = useServiceStore();
            try {
                this.theories = await services.theoryService.getAll();
            } catch (e) {
                console.error(e);
            }
        },
        async getById(id: string) {
            const services = useServiceStore();
            try {
                this.theory = await services.theoryService.getById(id);
            } catch (e) {
                console.error(e);
            }
        },

        async remove(id: string) {
            const services = useServiceStore();
            try {
                await services.theoryService.remove(id);
                this.theories = this.theories.filter((t) => t._id !== id);
            } catch (e) {
                console.error(e);
            }
        },
    },
});