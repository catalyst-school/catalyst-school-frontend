import type { CreateTopicDto } from '@/models/topic/dto/CreateTopicDto';
import type { UpdateTopicDto } from '@/models/topic/dto/UpdateTopicDto';
import type { Topic } from '@/models/topic/Topic';
import type { TopicSectionType } from '@/models/topic/TopicSection';
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

        async addSection(id: string, sectionType: TopicSectionType) {
            const services = useServiceStore();
            if (this.topic?._id === id) {
                try {
                    const sections = [
                        ...this.topic.sections,
                        {
                            type: sectionType,
                            theories: [],
                            tasks: [],
                        },
                    ];
                    const updatedTopic = await services.topicService.update(id, {
                        sections,
                    } as UpdateTopicDto);
                    this.topic.sections = updatedTopic.sections;
                    return updatedTopic;
                } catch (e) {
                    console.error(e);
                }
            } else {
                // todo propbably request from backend
            }
        },

        async removeSection(id: string, sectionId: string) {
            const services = useServiceStore();
            if (this.topic?._id === id) {
                try {
                    const sections = this.topic.sections.filter((s) => s._id !== sectionId);
                    const updatedTopic = await services.topicService.update(id, {
                        sections,
                    } as UpdateTopicDto);
                    this.topic.sections = updatedTopic.sections;
                    return updatedTopic;
                } catch (e) {
                    console.error(e);
                }
            } else {
                // todo propbably request from backend
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
