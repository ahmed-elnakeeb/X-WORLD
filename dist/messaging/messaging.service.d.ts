import { CreateMessagingDto } from './dto/create-messaging.dto';
export declare class MessagingService {
    private readonly prisma;
    private responses;
    create(createMessagingDto: CreateMessagingDto): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    getChatMessages(id: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
}
