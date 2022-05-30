import type { CreateGoalDto } from '@/models/goal/dto/CreateGoalDto';
import type { UpdateGoalDto } from '@/models/goal/dto/UpdateGoalDto';
import type { Goal } from '@/models/goal/Goal';
import axios from 'axios';

export class GoalService {
    private API_URL = import.meta.env.VITE_API_URL;

    public async create(topic: CreateGoalDto): Promise<Goal> {
        const res = await axios.post(`${this.API_URL}/goals`, { ...topic });
        return res.data;
    }

    public async update(id: string, topic: UpdateGoalDto): Promise<Goal> {
        const res = await axios.patch(`${this.API_URL}/goals/${id}`, { ...topic });
        return res.data;
    }

    public async getAll(): Promise<Goal[]> {
        const res = await axios.get(`${this.API_URL}/goals`);
        return res.data;
    }

    public async getById(id: string): Promise<Goal> {
        const res = await axios.get(`${this.API_URL}/goals/${id}`);
        return res.data;
    }

    public async remove(id: string): Promise<Goal[]> {
        const res = await axios.delete(`${this.API_URL}/goals/${id}`);
        return res.data;
    }
}
