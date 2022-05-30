import type { CreateGoalDto } from '@/models/goal/dto/CreateGoalDto';
import type { UpdateGoalDto } from '@/models/goal/dto/UpdateGoalDto';
import type { Goal } from '@/models/goal/Goal';
import { defineStore } from 'pinia';
import { useServiceStore } from './ServiceStore';
import { Stores } from './StoresEnum';

interface GoalRootState {
    goals: Goal[];
    goal: Goal | null;
}

export const useGoalStore = defineStore(Stores.Goal, {
    state: (): GoalRootState => ({
        goals: [],
        goal: null,
    }),
    actions: {
        async updateTitle(id: string, title: string) {
            const services = useServiceStore();
            try {
                const updated = await services.goalService.update(id, { title });
                if (this.goal) this.goal.title = title;
                return updated;
            } catch (e) {
                console.error(e);
            }
        },

        // async addSection(id: string, sectionType: TopicSectionType) {
        //     const services = useServiceStore();
        //     if (this.topic?._id === id) {
        //         try {
        //             const sections = [
        //                 ...this.topic.sections,
        //                 {
        //                     type: sectionType,
        //                     theories: [],
        //                     tasks: [],
        //                 },
        //             ];
        //             const updatedTopic = await services.topicService.update(id, {
        //                 sections,
        //             } as UpdateTopicDto);
        //             this.topic.sections = updatedTopic.sections;
        //             return updatedTopic;
        //         } catch (e) {
        //             console.error(e);
        //         }
        //     } else {
        //         // todo propbably request from backend
        //     }
        // },

        // async removeSection(id: string, sectionId: string) {
        //     const services = useServiceStore();
        //     if (this.topic?._id === id) {
        //         try {
        //             const sections = this.topic.sections.filter((s) => s._id !== sectionId);
        //             const updatedTopic = await services.topicService.update(id, {
        //                 sections,
        //             } as UpdateTopicDto);
        //             this.topic.sections = updatedTopic.sections;
        //             return updatedTopic;
        //         } catch (e) {
        //             console.error(e);
        //         }
        //     } else {
        //         // todo propbably request from backend
        //     }
        // },

        async create(goal: CreateGoalDto) {
            const services = useServiceStore();
            try {
                const newGoal = await services.goalService.create(goal);
                this.goals.push(newGoal);
                return newGoal;
            } catch (e) {
                console.error(e);
            }
        },

        async update(id: string, goal: UpdateGoalDto) {
            const services = useServiceStore();
            try {
                this.goal = null;
                const updated = await services.goalService.update(id, goal);
                const index = this.goals.findIndex((t) => t._id === id);
                this.goals[index] = updated;
                this.goal = updated;
                return updated;
            } catch (e) {
                console.error(e);
            }
        },

        async getAll() {
            const services = useServiceStore();
            try {
                this.goals = await services.goalService.getAll();
            } catch (e) {
                console.error(e);
            }
        },

        async getById(id: string) {
            const services = useServiceStore();
            try {
                this.goal = await services.goalService.getById(id);
            } catch (e) {
                console.error(e);
            }
        },

        async remove(id: string) {
            const services = useServiceStore();
            try {
                await services.goalService.remove(id);
                this.goals = this.goals.filter((t) => t._id !== id);
            } catch (e) {
                console.error(e);
            }
        },
    },
});
