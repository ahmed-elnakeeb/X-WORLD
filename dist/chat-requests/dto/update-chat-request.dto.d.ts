import { CreateChatRequestDto } from './create-chat-request.dto';
import { Chat_requests_status } from '../../types/enum';
declare const UpdateChatRequestDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateChatRequestDto>>;
export declare class UpdateChatRequestDto extends UpdateChatRequestDto_base {
    chat_request_id: string;
    ststus: Chat_requests_status;
}
export {};
