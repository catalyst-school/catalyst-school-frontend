import type { CreateTheoryDto } from '@/models/theory/dto/CreateTheoryDto';
import type { UpdateTheoryDto } from '@/models/theory/dto/UpdateTheoryDto';
import type { Theory } from '@/models/theory/Theory';
import { defineStore } from 'pinia';
import { useServiceStore } from './ServiceStore';
import { Stores } from './StoresEnum';

interface TheoryRootState {
    theories: Theory[];
    theory: Theory | null;
}

export const useTheoryStore = defineStore(Stores.Theory, {
    state: (): TheoryRootState => ({
        theory: null,
        theories: [],
    }),
    actions: {
        async create(theory: CreateTheoryDto): Promise<Theory | undefined> {
            const services = useServiceStore();
            try {
                const newTheory = await services.theoryService.create(theory);
                this.theories.push(newTheory);
                return newTheory;
            } catch (e) {
                console.error(e);
            }
        },
        async update(id: string, theory: UpdateTheoryDto): Promise<void> {
            const services = useServiceStore();
            try {
                const updateTheory = await services.theoryService.update(id, theory);
                const index = this.theories.findIndex((t) => t._id === id);
                this.theories[index] = updateTheory;
            } catch (e) {
                console.error(e);
            }
        },
        async getAll(): Promise<void> {
            const services = useServiceStore();
            try {
                this.theories = await services.theoryService.getAll();
            } catch (e) {
                console.error(e);
            }
        },
        async getById(id: string): Promise<Theory | undefined> {
            const services = useServiceStore();
            try {
                return (this.theory = await services.theoryService.getById(id));
            } catch (e) {
                console.error(e);
            }
        },

        async remove(id: string): Promise<void> {
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
