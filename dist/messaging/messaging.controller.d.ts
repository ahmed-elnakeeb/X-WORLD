import { MessagingService } from './messaging.service';
import { CreateMessagingDto } from './dto/create-messaging.dto';
export declare class MessagingController {
    private readonly messagingService;
    constructor(messagingService: MessagingService);
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
