import type { CreateTopicSessionDto } from '@/models/topic-session/dto/CreateTopicSession.dto';
import type { TopicSession } from '@/models/topic-session/TopicSession';
import type { UserGoal } from '@/models/user-goal/UserGoal';
import { defineStore } from 'pinia';
import { useServiceStore } from './ServiceStore';
import { Stores } from './StoresEnum';

interface TopicSessionRootState {
    topicSession: TopicSession | undefined;
}

export const useTopicSessionStore = defineStore(Stores.TopicSession, {
    state: (): TopicSessionRootState => ({
        topicSession: undefined,
    }),
    actions: {
        async create(createTopicSessionDto: CreateTopicSessionDto, skipUpdate?: boolean) {
            const services = useServiceStore();
            try {
                const res = await services.topicSessionService.create(createTopicSessionDto);
                if (!skipUpdate) {
                    this.topicSession = res;
                }
                return res;
            } catch (e) {
                console.error(e);
            }
        },

        async getById(id: string, skipUpdate?: boolean) {
            const services = useServiceStore();
            try {
                const res = await services.topicSessionService.getById(id);
                if (!skipUpdate) {
                    this.topicSession = res;
                }
            } catch (e) {
                console.error(e);
            }
        },
    },
});
