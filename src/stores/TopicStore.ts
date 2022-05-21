import type { CreateTopicDto } from '@/models/topic/dto/CreateTopicDto';
import type { UpdateTopicDto } from '@/models/topic/dto/UpdateTopicDto';
import type { Topic } from '@/models/topic/Topic';
import { defineStore } from 'pinia';
import { useServiceStore } from './ServiceStore';
import { Stores } from './StoresEnum';

interface TopicRootState {
    topics: Topic[];
    topic: Topic | null;
}

export const useTopicStore = defineStore(Stores.Topic, {
    state: (): TopicRootState => ({
        topics: [],
        topic: null,
    }),
    actions: {
        async create(topic: CreateTopicDto) {
            const services = useServiceStore();
            try {
                const newTopic = await services.topicService.create(topic);
                this.topics.push(newTopic);
            } catch (e) {
                console.error(e);
            }
        },

        async update(id: string, topic: UpdateTopicDto) {
            const services = useServiceStore();
            try {
                const updatedTopic = await services.topicService.update(id, topic);
                const index = this.topics.findIndex((t) => t._id === id);
                this.topics[index] = updatedTopic;
                this.topic = updatedTopic;
            } catch (e) {
                console.error(e);
            }
        },

        async getAll() {
            const services = useServiceStore();
            try {
                this.topics = await services.topicService.getAll();
            } catch (e) {
                console.error(e);
            }
        },

        async getById(id: string) {
            const services = useServiceStore();
            try {
                this.topic = await services.topicService.getById(id);
            } catch (e) {
                console.error(e);
            }
        },

        async remove(id: string) {
            const services = useServiceStore();
            try {
                await services.topicService.remove(id);
                this.topics = this.topics.filter((t) => t._id !== id);
            } catch (e) {
                console.error(e);
            }
        },
    },
});
