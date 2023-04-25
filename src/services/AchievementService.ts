import axios from 'axios';
import type { Achievement } from '@/models/achievement/dto/Achievement';
import type { UpdateAchievementDto } from '@/models/achievement/dto/UpdateAchievementDto';
import type { CreateAchievementDto } from '@/models/achievement/dto/CreateAchievementDto';

const API_URL = import.meta.env.VITE_API_URL;
export class AchievementService {
    async getById(id: string): Promise<Achievement> {
        const res = await axios.get(`${API_URL}/achievements/${id}`);
        return res.data;
    }

    async getAll(): Promise<Achievement[]> {
        const res = await axios.get(`${API_URL}/achievements`);
        return res.data;
    }

    async update(id: string, body: UpdateAchievementDto): Promise<Achievement> {
        const res = await axios.patch(`${API_URL}/achievements/${id}`, body);
        return res.data;
    }

    async create(body: CreateAchievementDto): Promise<Achievement> {
        const res = await axios.post(`${API_URL}/achievements`, body);
        return res.data;
    }

    async delete(id: string): Promise<Achievement> {
        const res = await axios.delete(`${API_URL}/achievements/${id}`);
        return res.data;
    }
}
