import { CreateCommentDto } from './dto/create-comment.dto';
import { Tweet } from '@prisma/client';
export declare class CommentService {
    private readonly prisma;
    private responses;
    private currentUser;
    private notificationService;
    create(createCommentDto: CreateCommentDto): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    vote(comment_uuid: string, is_voteUp: boolean): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    remove(comment_uuid: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    sendCommetsNotification(tweet: Tweet, totalCommentsCount: number): Promise<boolean>;
}
