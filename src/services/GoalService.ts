import type { CreateGoalDto } from '@/models/goal/dto/CreateGoalDto';
import type { UpdateGoalDto } from '@/models/goal/dto/UpdateGoalDto';
import type { Goal } from '@/models/goal/Goal';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
export class GoalService {
    async create(topic: CreateGoalDto): Promise<Goal> {
        const res = await axios.post(`${API_URL}/goals`, { ...topic });
        return res.data;
    }

    async update(id: string, topic: UpdateGoalDto): Promise<Goal> {
        const res = await axios.patch(`${API_URL}/goals/${id}`, { ...topic });
        return res.data;
    }

    async getAll(): Promise<Goal[]> {
        const res = await axios.get(`${API_URL}/goals`);
        return res.data;
    }

    async getById(id: string): Promise<Goal> {
        const res = await axios.get(`${API_URL}/goals/${id}`);
        return res.data;
    }

    async remove(id: string): Promise<Goal[]> {
        const res = await axios.delete(`${API_URL}/goals/${id}`);
        return res.data;
    }
}
