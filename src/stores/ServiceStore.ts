import { AuthService } from '@/services/AuthService';
import { GoalService } from '@/services/GoalService';
import { TaskService } from '@/services/TaskService';
import { TheoryService } from '@/services/TheoryService';
import { TopicService } from '@/services/TopicService';
import { UserGoalService } from '@/services/UserGoalService';
import { defineStore } from 'pinia';
import { Stores } from './StoresEnum';

export const useServiceStore = defineStore(Stores.Service, {
    state: () => ({
        topicService: new TopicService(),
        taskService: new TaskService(),
        goalService: new GoalService(),
        theoryService: new TheoryService(),
        authService: new AuthService(),
        userGoalService: new UserGoalService(),
    }),
});
