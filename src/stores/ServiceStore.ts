import { TopicService } from '@/services/TopicService';
import { defineStore } from 'pinia';
import { Stores } from './StoresEnum';

export const useServiceStore = defineStore(Stores.Service, {
    state: () => ({
        topicService: new TopicService(),
    }),
});
