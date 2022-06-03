import type { CreateTheoryDto } from '@/models/theory/dto/CreateTheoryDto';
import type { UpdateTheoryDto } from '@/models/theory/dto/UpdateTheoryDto';
import type { Theory } from '@/models/theory/Theory';
import axios from 'axios';

export class TheoryService {
    private API_URL = import.meta.env.VITE_API_URL;

    public async create(theory: CreateTheoryDto): Promise<Theory> {
        const res = await axios.post(`${this.API_URL}/theories`, { ...theory });
        return res.data;
    }

    public async update(id: string, theory: UpdateTheoryDto): Promise<Theory> {
        const res = await axios.patch(`${this.API_URL}/theories/${id}`, { ...theory });
        return res.data;
    }

    public async getAll(): Promise<Theory[]> {
        const res = await axios.get(`${this.API_URL}/theories`);
        return res.data;
    }

    public async getById(id: string): Promise<Theory> {
        const res = await axios.get(`${this.API_URL}/theories/${id}`);
        return res.data;
    }

    public async remove(id: string): Promise<Theory[]> {
        const res = await axios.delete(`${this.API_URL}/theories/${id}`);
        return res.data;
    }
}
