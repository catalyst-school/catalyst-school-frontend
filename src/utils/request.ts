import axios from 'axios';
import { UserConfig } from './UserConfig';

export async function request(method: string, url: string, data?: any) {
    return await axios({
        method,
        url,
        data,
        headers: getAuthHeader(),
    });
}

export default function getAuthHeader(): any {
    const token = localStorage.getItem(UserConfig.token);
    return { Authorization: `Bearer ${token}` };
}
