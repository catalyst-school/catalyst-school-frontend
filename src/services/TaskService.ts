import type { Task } from '@/models/task/Task';
import axios from 'axios';

export class TaskService {
    private API_URL = import.meta.env.VITE_API_URL;

    public async getAll(): Promise<Task[]> {
        const res = await axios.get(`${this.API_URL}/tasks`);
        return res.data;
    }
}
