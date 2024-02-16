import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationService {
    private readonly prisma;
    private responses;
    private currentUser;
    private notificationRepo;
    create(createNotificationDto: CreateNotificationDto): Promise<boolean>;
    findAll(): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    markAsRead(uuid: string): Promise<boolean>;
}
