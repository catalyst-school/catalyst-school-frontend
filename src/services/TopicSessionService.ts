import type { CreateTopicSessionDto } from '@/models/topic-session/dto/CreateTopicSession.dto';
import type { TopicSession } from '@/models/topic-session/TopicSession';
import { request } from '@/utils/request';
import type { UpdateProgressDto } from '@/models/topic-session/dto/UpdateProgress.dto';

const API_URL = import.meta.env.VITE_API_URL;
export class TopicSessionService {
    async create(createTopicSessionDto: CreateTopicSessionDto): Promise<TopicSession> {
        const res = await request('POST', `${API_URL}/topic-sessions`, createTopicSessionDto);
        return res.data;
    }

    async getById(id: string): Promise<TopicSession> {
        const res = await request('GET', `${API_URL}/topic-sessions/${id}`);
        return res.data;
    }

    async updateProgress(id: string, updateProgressDto: UpdateProgressDto): Promise<TopicSession> {
        const res = await request(
            'POST',
            `${API_URL}/topic-sessions/${id}/update-progress`,
            updateProgressDto,
        );
        return res.data;
    }
}
