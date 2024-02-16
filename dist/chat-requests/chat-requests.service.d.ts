import { CreateChatRequestDto } from './dto/create-chat-request.dto';
export declare class ChatRequestsService {
    private readonly prisma;
    private responses;
    private currentUser;
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
    responed(request_uuid: string, isAccepted: boolean): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
}
