export declare class CronService {
    private readonly prisma;
    private readonly fileUploadService;
    setBoostToFalseCron(): Promise<void>;
    autoDeleteTweetsAfterWeek(): Promise<void>;
}
