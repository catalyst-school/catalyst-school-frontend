import type { CreateUserGoalDto } from '@/models/user-goal/dto/CreateUserGoalDto';
import type { UserGoal } from '@/models/user-goal/UserGoal';
import { request } from '@/utils/request';

const API_URL = import.meta.env.VITE_API_URL;
export class UserGoalService {
    async getAll(): Promise<UserGoal[]> {
        const res = await request('GET', `${API_URL}/user-goal`);
        return res.data;
    }

    async create(userGoalDto: CreateUserGoalDto): Promise<UserGoal> {
        const res = await request('POST', `${API_URL}/user-goal`, userGoalDto);
        return res.data;
    }
}
