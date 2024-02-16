export declare class UserService {
    private readonly prisma;
    private responses;
    private currentUser;
    findAll(): Promise<void>;
    findCurrent(): Promise<void>;
    findOne(uuid: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    remove(uuid: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    ban(uuid: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    unBan(uuid: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
}
