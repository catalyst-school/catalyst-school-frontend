import { GoalService } from '@/services/GoalService';
import { TaskService } from '@/services/TaskService';
import { TheoryService } from '@/services/TheoryService';
import { TopicService } from '@/services/TopicService';
import { defineStore } from 'pinia';
import { Stores } from './StoresEnum';

export const useServiceStore = defineStore(Stores.Service, {
    state: () => ({
        topicService: new TopicService(),
        taskService: new TaskService(),
        goalService: new GoalService(),
        theoryService: new TheoryService(),
    }),
});
