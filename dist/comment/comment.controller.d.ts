import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(createCommentDto: CreateCommentDto): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    commentVoteUp(comment_uuid: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    commentVoteDown(comment_uuid: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    remove(comment_uuid: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
}
