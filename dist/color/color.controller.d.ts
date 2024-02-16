import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
export declare class ColorController {
    private readonly colorService;
    constructor(colorService: ColorService);
    create(createColorDto: CreateColorDto): Promise<void>;
    findAll(): Promise<void>;
    findOne(id: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    update(id: string, updateColorDto: UpdateColorDto): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    remove(id: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
}
