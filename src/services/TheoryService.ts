import type { CreateTheoryDto } from '@/models/theory/dto/CreateTheoryDto';
import type { UpdateTheoryDto } from '@/models/theory/dto/UpdateTheoryDto';
import type { Theory } from '@/models/theory/Theory';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export class TheoryService {
    async create(theory: CreateTheoryDto): Promise<Theory> {
        const res = await axios.post(`${API_URL}/theories`, { ...theory });
        return res.data;
    }

    async update(id: string, theory: UpdateTheoryDto): Promise<Theory> {
        const res = await axios.patch(`${API_URL}/theories/${id}`, { ...theory });
        return res.data;
    }

    async getAll(): Promise<Theory[]> {
        const res = await axios.get(`${API_URL}/theories`);
        return res.data;
    }

    async getById(id: string): Promise<Theory> {
        const res = await axios.get(`${API_URL}/theories/${id}`);
        return res.data;
    }

    async remove(id: string): Promise<Theory[]> {
        const res = await axios.delete(`${API_URL}/theories/${id}`);
        return res.data;
    }
}
