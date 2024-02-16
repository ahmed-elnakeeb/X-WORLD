import { ChatRequestsService } from './chat-requests.service';
import { CreateChatRequestDto } from './dto/create-chat-request.dto';
export declare class ChatRequestsController {
    private readonly chatRequestsService;
    constructor(chatRequestsService: ChatRequestsService);
    create(createChatRequestDto: CreateChatRequestDto): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    getAllrequestsToCurrentUser(): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    getAllrequestsFromCurrentUser(): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    getCurrentUserInbox(): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    acceptReqiest(request_uuid: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    rejectReqiest(request_uuid: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
}
