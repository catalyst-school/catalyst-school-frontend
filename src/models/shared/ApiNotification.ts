import type { Notification } from '@/ui/shared/models/Notification.enum';

export interface ApiNotification {
    type: Notification;
    text: string;
}
