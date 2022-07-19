import type { NotificationType } from '@/ui/shared/models/NotificationType.enum';

export interface ApiResponse {
    type: NotificationType;
    text: string;
}
