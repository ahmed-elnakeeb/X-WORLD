export declare class SettingService {
    private readonly prisma;
    findAll(): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
}
