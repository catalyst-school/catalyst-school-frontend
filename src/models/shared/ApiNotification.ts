import type { NotificationType } from '@/ui/shared/models/NotificationType.enum';

export interface ApiNotification {
    type: NotificationType;
    text: string;
}
