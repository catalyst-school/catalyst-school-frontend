import type { Topic } from '@/models/Topic';
import axios from 'axios';

export class TopicService {
    private API_URL = import.meta.env.VITE_API_URL;

    public async getAll(): Promise<Topic[]> {
        const res = await axios(`${this.API_URL}/topics`, {
            method: 'GET',
        });
        return res.data;
    }

    public async getById(id: string): Promise<Topic[]> {
        const res = await axios(`${this.API_URL}/topics/${id}`, {
            method: 'GET',
        });
        return res.data;
    }
}
