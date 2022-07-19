import type { CreateTopicDto } from '@/models/topic/dto/CreateTopicDto';
import type { UpdateTopicDto } from '@/models/topic/dto/UpdateTopicDto';
import type { Topic } from '@/models/topic/Topic';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
export class TopicService {
    async create(topic: CreateTopicDto): Promise<Topic> {
        const res = await axios.post(`${API_URL}/topics`, { ...topic });
        return res.data;
    }

    async update(id: string, topic: UpdateTopicDto): Promise<Topic> {
        const res = await axios.patch(`${API_URL}/topics/${id}`, { ...topic });
        return res.data;
    }

    async getAll(): Promise<Topic[]> {
        const res = await axios.get(`${API_URL}/topics`);
        return res.data;
    }

    async getById(id: string): Promise<Topic> {
        const res = await axios.get(`${API_URL}/topics/${id}`);
        return res.data;
    }

    async remove(id: string): Promise<Topic[]> {
        const res = await axios.delete(`${API_URL}/topics/${id}`);
        return res.data;
    }
}
