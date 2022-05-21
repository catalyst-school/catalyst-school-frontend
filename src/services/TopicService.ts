import type { CreateTopicDto } from '@/models/topic/dto/CreateTopicDto';
import type { UpdateTopicDto } from '@/models/topic/dto/UpdateTopicDto';
import type { Topic } from '@/models/topic/Topic';
import axios from 'axios';

export class TopicService {
    private API_URL = import.meta.env.VITE_API_URL;

    public async create(topic: CreateTopicDto): Promise<Topic> {
        const res = await axios.post(`${this.API_URL}/topics`, { ...topic });
        return res.data;
    }

    public async update(id: string, topic: UpdateTopicDto): Promise<Topic> {
        const res = await axios.patch(`${this.API_URL}/topics/${id}`, { ...topic });
        return res.data;
    }

    public async getAll(): Promise<Topic[]> {
        const res = await axios.get(`${this.API_URL}/topics`);
        return res.data;
    }

    public async getById(id: string): Promise<Topic> {
        const res = await axios.get(`${this.API_URL}/topics/${id}`);
        return res.data;
    }

    public async remove(id: string): Promise<Topic[]> {
        const res = await axios.delete(`${this.API_URL}/topics/${id}`);
        return res.data;
    }
}
