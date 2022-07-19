import type { Task } from '@/models/task/Task';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
export class TaskService {
    async getAll(): Promise<Task[]> {
        const res = await axios.get(`${API_URL}/tasks`);
        return res.data;
    }
}
