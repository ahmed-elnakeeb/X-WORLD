/// <reference types="multer" />
export declare class FileUploadService {
    private readonly prisma;
    private responses;
    constructor();
    uploadFile(file: Express.Multer.File): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    getFile(uuid: string): Promise<{
        status: number;
        data: {
            uuid: string;
            url: string;
        };
        msg: string;
    }>;
    delete(uuid: string): Promise<{
        status: number;
        data: any[];
        msg: string;
    }>;
    bulkDeleteFormCloud(publicIds: string[]): Promise<void>;
    bulkDeleteFormDB(filesId: string[]): Promise<void>;
    private uploadFileToCloud;
    private deleteFromCloud;
    private validateFile;
}
