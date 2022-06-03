import type { CreateGoalDto } from '@/models/goal/dto/CreateGoalDto';
import type { UpdateGoalDto } from '@/models/goal/dto/UpdateGoalDto';
import type { Goal } from '@/models/goal/Goal';
import type { Topic } from '@/models/topic/Topic';
import { resultLight } from 'naive-ui/lib/result/styles';
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
        async updateTitle(title: string, id?: string) {
            if (id) {
                return;
                // todo update title for passed id goal
            }

            if (this.goal) {
                const services = useServiceStore();
                try {
                    const updated = await services.goalService.update(this.goal._id, { title });
                    this.goal.title = title;
                    return updated;
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.warn('No Goal id is provided');
            }
        },

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

        async update(goal: UpdateGoalDto, id?: string) {
            if (id) {
                return;
                // todo update for passed id goal
            }

            const services = useServiceStore();
            if (this.goal) {
                try {
                    const updated = await services.goalService.update(this.goal._id, goal);
                    const index = this.goals.findIndex((t) => t._id === id);
                    this.goals[index] = updated;
                    this.goal = updated;
                    return updated;
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.warn('No Goal id is provided');
            }
        },

        async getAll(skipUpdate?: boolean) {
            const services = useServiceStore();
            try {
                const res = await services.goalService.getAll();
                if (!skipUpdate) {
                    this.goals = res;
                }
                return res;
            } catch (e) {
                console.error(e);
            }
        },

        async getById(id: string, skipUpdate?: boolean) {
            const services = useServiceStore();
            try {
                const res = await services.goalService.getById(id);
                if (!skipUpdate) {
                    this.goal = res;
                }
                return res;
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

        async addTopic(topic: Topic, id?: string) {
            if (id) {
                return;
                // todo update for passed id goal
            }

            const services = useServiceStore();
            if (this.goal) {
                try {
                    const updated = await services.goalService.update(this.goal._id, {
                        topics: [...(this.goal.topics?.map((t) => t._id) || []), topic._id],
                    });
                    this.goal.topics?.push(topic);
                    return updated;
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.warn('No Goal id is provided');
            }
        },

        async removeTopic(topic: Topic, id?: string) {
            if (id) {
                return;
                // todo update for passed id goal
            }

            const services = useServiceStore();
            if (this.goal) {
                try {
                    const updated = await services.goalService.update(this.goal._id, {
                        topics: [
                            ...(this.goal.topics
                                ?.filter((t) => t._id !== topic._id)
                                ?.map((t) => t._id) || []),
                        ],
                    });
                    this.goal.topics = updated.topics;
                    return updated;
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.warn('No Goal id is provided');
            }
        },

        async saveTopicOrder() {
            const services = useServiceStore();
            if (this.goal) {
                try {
                    const updated = await services.goalService.update(this.goal._id, {
                        topics: this.goal.topics?.map((t) => t._id),
                    });
                    this.goal.topics = updated.topics;
                    return updated;
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.warn('No Goal id is provided');
            }
        },
    },
});
