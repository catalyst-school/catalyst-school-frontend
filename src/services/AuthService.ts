import type { CreateUserDto } from '@/models/auth/dto/CreatUserDto';
import type { ForgotPasswordDto } from '@/models/auth/dto/ForgotPasswordDto';
import type { LoginDto } from '@/models/auth/dto/LoginDto';
import type { UserDto } from '@/models/auth/dto/UserDto';
import { UserConfig } from '@/util-configs/UserConfig';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export class AuthService {
    async login(data: LoginDto): Promise<string> {
        const res = await axios.post(`${API_URL}/auth/email/login`, data);
        return res.data;
    }

    async register(data: CreateUserDto): Promise<UserDto> {
        const res = await axios.post(`${API_URL}/auth/email/register`, data);
        return res.data;
    }

    async forgotPassword(data: ForgotPasswordDto): Promise<any> {
        const res = await axios.post(`${API_URL}/auth/email/forgot-password`, data);
        return res;
    }

    async confirmEmail(token: string): Promise<void> {
        await axios.post(`${API_URL}/auth/email/confirm`, null, { headers: authHeader(token) });
    }

    async resetPassword(token: string, password: string): Promise<void> {
        await axios.post(
            `${API_URL}/auth/email/reset-password`,
            { password },
            { headers: authHeader(token) },
        );
    }

    logout(): void {
        localStorage.removeItem(UserConfig.token);
    }
}

export default function authHeader(token: string): any {
    return { Authorization: `Bearer ${token}` };
}
