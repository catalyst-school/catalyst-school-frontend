import type { CreateUserDto } from '@/models/user/dto/CreatUserDto';
import type { ForgotPasswordDto } from '@/models/auth/dto/ForgotPasswordDto';
import type { LoginDto } from '@/models/auth/dto/LoginDto';
import type { UserDto } from '@/models/auth/dto/UserDto';
import { UserConfig } from '@/utils/UserConfig';
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

    async forgotPassword(data: ForgotPasswordDto): Promise<void> {
        return await axios.post(`${API_URL}/auth/email/forgot-password`, data);
    }

    async confirmEmail(token: string): Promise<void> {
        await axios.post(`${API_URL}/auth/email/confirm`, null, { headers: getAuthHeader(token) });
    }

    async resetPassword(token: string, password: string): Promise<void> {
        await axios.post(
            `${API_URL}/auth/email/reset-password`,
            { password },
            { headers: getAuthHeader(token) },
        );
    }

    logout(): void {
        localStorage.removeItem(UserConfig.token);
    }
}

export default function getAuthHeader(token: string): any {
    return { Authorization: `Bearer ${token}` };
}
