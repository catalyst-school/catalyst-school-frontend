import { request } from '@/utils/request';

const API_URL = import.meta.env.VITE_API_URL;

export class UserService {
    async getProfile() {
        const res = await request('GET', `${API_URL}/users/profile`);
        return res.data;
    }
}
