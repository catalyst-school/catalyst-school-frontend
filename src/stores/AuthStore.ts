import type { CreateUserDto } from '@/models/user/dto/CreatUserDto';
import type { LoginDto } from '@/models/auth/dto/LoginDto';
import { NotificationType } from '@/ui/shared/models/NotificationType.enum';
import { UserConfig } from '@/utils/UserConfig';
import { defineStore } from 'pinia';
import { useServiceStore } from './ServiceStore';
import { Stores } from './StoresEnum';
import type { ApiResponse } from '@/models/shared/ApiResponse';

interface ApiError {
    response: { status: number };
}

const DEFAULT_NOTIFICATION = {
    type: NotificationType.WARNING,
    text: 'Произошла неизвестная ошибка, попробуйте позже',
};

export const useAuthStore = defineStore(Stores.Auth, {
    getters: {
        isLoggedIn(): boolean {
            return !!localStorage.getItem(UserConfig.token);
        },
    },
    actions: {
        async login(data: LoginDto): Promise<ApiResponse> {
            const services = useServiceStore();
            try {
                const userToken = await services.authService.login(data);
                localStorage.setItem(UserConfig.token, userToken);
            } catch (e) {
                switch ((e as ApiError).response.status) {
                    case 401:
                        return {
                            type: NotificationType.ERROR,
                            text: 'Неверный пароль',
                        };
                    case 404:
                        return {
                            type: NotificationType.ERROR,
                            text: 'Пользователь не найден',
                        };
                    default:
                        return DEFAULT_NOTIFICATION;
                }
            }

            return {
                type: NotificationType.SUCCESS,
                text: 'Добро пожаловать',
            };
        },
        async register(data: CreateUserDto): Promise<ApiResponse> {
            const services = useServiceStore();

            try {
                await services.authService.register(data);
            } catch (e) {
                switch ((e as ApiError).response.status) {
                    case 400:
                        return {
                            type: NotificationType.ERROR,
                            text: 'Пользователь с таким Email уже зарегестрирован',
                        };
                    default:
                        return DEFAULT_NOTIFICATION;
                }
            }

            return {
                type: NotificationType.SUCCESS,
                text: 'Перейдите в почту для подтверждения',
            };
        },
        async forgotPassword(email: LoginDto['email']): Promise<ApiResponse> {
            const services = useServiceStore();

            try {
                await services.authService.forgotPassword({ email });
            } catch (e) {
                switch ((e as ApiError).response.status) {
                    case 404:
                        return {
                            type: NotificationType.ERROR,
                            text: 'Пользователь не найден',
                        };
                    default:
                        return DEFAULT_NOTIFICATION;
                }
            }

            return {
                type: NotificationType.SUCCESS,
                text: 'Перейдите на почту для восстановления пароля',
            };
        },
        async confirmEmail(token: string): Promise<ApiResponse> {
            const services = useServiceStore();

            try {
                await services.authService.confirmEmail(token);
            } catch (e) {
                switch ((e as ApiError).response.status) {
                    case 400:
                        return {
                            type: NotificationType.ERROR,
                            text: 'Email уже подтвержден',
                        };
                    default:
                        return DEFAULT_NOTIFICATION;
                }
            }

            localStorage.setItem(UserConfig.token, token);
            return {
                type: NotificationType.SUCCESS,
                text: 'Email успешно подтвержден',
            };
        },
        async resetPassword(token: string, password: string): Promise<ApiResponse> {
            const services = useServiceStore();

            try {
                await services.authService.resetPassword(token, password);
            } catch (e) {
                switch ((e as ApiError).response.status) {
                    case 404:
                        return {
                            type: NotificationType.ERROR,
                            text: 'Пользователь не найден',
                        };
                    default:
                        return DEFAULT_NOTIFICATION;
                }
            }

            return {
                type: NotificationType.SUCCESS,
                text: 'Новый пароль установлен',
            };
        },
        logout(): void {
            const services = useServiceStore();
            services.authService.logout();
        },
    },
});
