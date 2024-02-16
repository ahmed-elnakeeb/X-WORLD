import { SettingService } from './setting.service';
export declare class SettingController {
    private readonly settingService;
    constructor(settingService: SettingService);
    findAll(): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
}
