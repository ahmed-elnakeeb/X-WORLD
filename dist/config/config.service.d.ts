/// <reference types="multer" />
import { Algorithm } from 'jsonwebtoken';
declare class PrivateConfigService {
    private readonly globalConfig;
    multerConfig: {
        dest: string;
        storage: import("multer").StorageEngine;
    };
    jwtSecret: string;
    jwtSignOptions: {
        expiresIn: string;
        algorithm: Algorithm;
    };
    standardVoteDwonsCount: number;
    standardVotesPercentage: number;
    set(key: string, value: any): void;
    get(key: string): any;
}
export declare const ConfigService: PrivateConfigService;
export {};
