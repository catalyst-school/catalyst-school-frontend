import type { CreateTopicDto, CreateUnitDto } from '@/models/topic/dto/CreateTopicDto';
import type { UpdateTopicDto } from '@/models/topic/dto/UpdateTopicDto';
import type { Topic } from '@/models/topic/Topic';
import { defineStore } from 'pinia';
import { useServiceStore } from './ServiceStore';
import { Stores } from './StoresEnum';
import type { Unit } from '@/models/topic/Unit';

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
        async updateTitle(id: string, title: string) {
            const services = useServiceStore();
            try {
                const updatedTopic = await services.topicService.update(id, { title });
                if (this.topic) this.topic.title = title;
                return updatedTopic;
            } catch (e) {
                console.error(e);
            }
        },

        async addUnit(unit: CreateUnitDto): Promise<Topic | undefined> {
            const services = useServiceStore();

            if (!this.topic) {
                return;
            }

            this.topic.units?.push(unit as Unit);

            try {
                return await services.topicService.update(this.topic._id, this.topic);
            } catch (e) {
                console.error(e);
            }
        },

        async removeUnit(unit: Unit): Promise<Topic | undefined> {
            const services = useServiceStore();

            if (!this.topic) {
                return;
            }

            this.topic.units = this.topic.units?.filter((u) => u._id !== unit._id);

            try {
                return await services.topicService.update(this.topic._id, this.topic);
            } catch (e) {
                console.error(e);
            }
        },

        async create(topic: CreateTopicDto) {
            const services = useServiceStore();
            try {
                const newTopic = await services.topicService.create(topic);
                this.topics.push(newTopic);
                return newTopic;
            } catch (e) {
                console.error(e);
            }
        },

        async update(id: string, topic: UpdateTopicDto) {
            const services = useServiceStore();
            try {
                this.topic = null;
                const updatedTopic = await services.topicService.update(id, topic);
                const index = this.topics.findIndex((t) => t._id === id);
                this.topics[index] = updatedTopic;
                this.topic = updatedTopic;
                return updatedTopic;
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

        async getById(id: string, skipUpdate?: boolean) {
            const services = useServiceStore();
            try {
                const res = await services.topicService.getById(id);
                if (!skipUpdate) {
                    this.topic = res;
                }
                return res;
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
