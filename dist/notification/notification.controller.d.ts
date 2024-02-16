import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    findAll(): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    markAsRead(uuid: string): Promise<boolean>;
}
