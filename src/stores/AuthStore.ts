import type { CreateUserDto } from '@/models/auth/dto/CreatUserDto';
import type { LoginDto } from '@/models/auth/dto/LoginDto';
import { NotificationEnum } from '@/ui/shared/models/notification.enum';
import { UserConfig } from '@/util-configs/UserConfig';
import { defineStore } from 'pinia';
import { useServiceStore } from './ServiceStore';
import { Stores } from './StoresEnum';

interface ApiError {
    response: {
        status: number;
    };
}
interface Notification {
    type: NotificationEnum;
    text: string;
}

const SOME_ERROR = 'Произошла неизвестная ошибка, попробуйте позже';

export const useAuthStore = defineStore(Stores.Auth, {
    actions: {
        async login(data: LoginDto): Promise<Notification> {
            const services = useServiceStore();
            try {
                const userToken = await services.authService.login(data);
                localStorage.setItem(UserConfig.token, userToken);
            } catch (e) {
                switch ((e as ApiError).response.status) {
                    case 401:
                        return {
                            type: NotificationEnum.ERROR,
                            text: 'Неверный пароль',
                        };
                    default:
                        return {
                            type: NotificationEnum.WARNING,
                            text: SOME_ERROR,
                        };
                }
            }

            return {
                type: NotificationEnum.SUCCESS,
                text: 'Пользователь успешно найден',
            };
        },
        async register(data: CreateUserDto): Promise<Notification> {
            const services = useServiceStore();

            try {
                await services.authService.register(data);
            } catch (e) {
                switch ((e as ApiError).response.status) {
                    case 400:
                        return {
                            type: NotificationEnum.ERROR,
                            text: 'Пользователь с таким email уже зарегестрирован',
                        };
                    default:
                        return {
                            type: NotificationEnum.WARNING,
                            text: SOME_ERROR,
                        };
                }
            }

            return {
                type: NotificationEnum.SUCCESS,
                text: 'перейдите в почту для подтверждения',
            };
        },
        async forgotPassword(email: LoginDto['email']): Promise<Notification> {
            const services = useServiceStore();

            try {
                await services.authService.forgotPassword({ email });
            } catch (e) {
                switch ((e as ApiError).response.status) {
                    default:
                        return {
                            type: NotificationEnum.WARNING,
                            text: SOME_ERROR,
                        };
                }
            }

            return {
                type: NotificationEnum.SUCCESS,
                text: 'Новый пароль выслан на почту',
            };
        },
        async confirmEmail(token: string): Promise<Notification> {
            const services = useServiceStore();

            try {
                await services.authService.confirmEmail(token);
            } catch (e) {
                switch ((e as ApiError).response.status) {
                    case 400:
                        return {
                            type: NotificationEnum.ERROR,
                            text: 'email уже подтвержден',
                        };
                        break;
                    default:
                        return {
                            type: NotificationEnum.WARNING,
                            text: SOME_ERROR,
                        };
                }
            }

            localStorage.setItem(UserConfig.token, token);
            return {
                type: NotificationEnum.SUCCESS,
                text: 'email успешно подтвержден',
            };
        },
        logout(): void {
            const services = useServiceStore();
            services.authService.logout();
        },
    },
});
