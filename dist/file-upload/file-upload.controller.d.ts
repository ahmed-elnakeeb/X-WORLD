/// <reference types="multer" />
import { FileUploadService } from './file-upload.service';
export declare class FileUploadController {
    private readonly fileUploadService;
    constructor(fileUploadService: FileUploadService);
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
}
