import { Stores } from '@/stores/StoresEnum';
import { defineStore } from 'pinia';
import { useServiceStore } from '@/stores/ServiceStore';
import type { Topic } from '@/models/topic/Topic';
import type { Goal } from '@/models/goal/Goal';
import type { CreateAchievementDto } from '@/models/achievement/dto/CreateAchievementDto';
import type { UpdateAchievementDto } from '@/models/achievement/dto/UpdateAchievementDto';
import type { Achievement } from '@/models/achievement/dto/Achievement';

interface AchievementRootState {
    achievements: Achievement[];
    achievement: Achievement | null;
}

export const useAchievementStore = defineStore(Stores.Achievement, {
    state: (): AchievementRootState => ({
        achievements: [],
        achievement: null,
    }),
    actions: {
        async getAll() {
            const services = useServiceStore();
            try {
                const achievements = await services.achievementService.getAll();
                this.achievements = achievements;
                this.achievement = null;

                return achievements;
            } catch (e) {
                console.error(e);
            }
        },

        async getById(id: string) {
            const services = useServiceStore();

            try {
                const foundAchievement = await services.achievementService.getById(id);
                this.achievement = foundAchievement;

                return foundAchievement;
            } catch (e) {
                console.error(e);
            }
        },

        async create(achievement: CreateAchievementDto) {
            const services = useServiceStore();
            try {
                this.achievement = null;
                const createdAchievement = await services.achievementService.create(achievement);

                this.achievements.push(createdAchievement);

                this.achievement = createdAchievement;
                return createdAchievement;
            } catch (e) {
                console.error(e);
            }
        },

        async update(id: string, achievement: UpdateAchievementDto) {
            const services = useServiceStore();
            try {
                this.achievement = null;
                const updatedAchievement = await services.achievementService.update(
                    id,
                    achievement,
                );
                const index = this.achievements.findIndex((t) => t._id === id);
                this.achievements[index] = updatedAchievement;
                this.achievement = updatedAchievement;

                return updatedAchievement;
            } catch (e) {
                console.error(e);
            }
        },

        async updateTitle(title: string) {
            if (this.achievement) {
                const services = useServiceStore();
                try {
                    const updated = await services.achievementService.update(this.achievement._id, {
                        title,
                    });
                    this.achievement.title = title;
                    return updated;
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.warn('No Goal id is provided');
            }
        },

        async addTopic(topic: Topic, id?: string) {
            if (id) {
                return;
                // todo update for passed id goal
            }

            const services = useServiceStore();
            if (this.achievement) {
                try {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const updated = await services.achievementService.update(this.achievement._id, {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        topics: [...(this.achievement.topics?.map((t) => t._id) || []), topic._id],
                    });
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    this.achievement.topics?.push(topic);
                    return updated;
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.warn('No achievement is exist');
            }
        },

        async addGoal(goal: Goal, id?: string) {
            if (id) {
                return;
                // todo update for passed id goal
            }

            const services = useServiceStore();
            if (this.achievement) {
                try {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const updated = await services.achievementService.update(this.achievement._id, {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        goals: [...(this.achievement.goals?.map((t) => t._id) || []), goal._id],
                    });
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    this.achievement.goals?.push(goal);
                    return updated;
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.warn('No achievement is exist');
            }
        },

        async delete(id: string) {
            const services = useServiceStore();

            try {
                await services.achievementService.delete(id);

                this.achievements = this.achievements.filter((t) => t._id !== id);
            } catch (e) {
                console.error(e);
            }
        },

        async deleteTopic(topic: Topic) {
            const services = useServiceStore();
            if (this.achievement) {
                try {
                    const updated = await services.achievementService.update(this.achievement._id, {
                        topics: [
                            ...(this.achievement.topics
                                ?.filter((t) => t._id !== topic._id)
                                ?.map((t) => t._id) || []),
                        ],
                    });

                    this.achievement.topics = updated.topics;

                    return updated;
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.warn('achievement is not exist');
            }
        },

        async deleteGoal(goal: Goal) {
            const services = useServiceStore();
            if (this.achievement) {
                try {
                    const updated = await services.achievementService.update(this.achievement._id, {
                        goals: [
                            ...(this.achievement.goals
                                ?.filter((t) => t._id !== goal._id)
                                ?.map((t) => t._id) || []),
                        ],
                    });

                    this.achievement.goals = updated.goals;

                    return updated;
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.warn('achievement is not exist');
            }
        },
    },
});
