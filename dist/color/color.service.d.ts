import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
export declare class ColorService {
    private readonly prisma;
    private responses;
    create(createColorDto: CreateColorDto): Promise<void>;
    findAll(): Promise<void>;
    findOne(id: number): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    update(id: number, updateColorDto: UpdateColorDto): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    remove(id: number): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
}
