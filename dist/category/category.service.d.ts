import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryService {
    private readonly prisma;
    private responses;
    create(createCategoryDto: CreateCategoryDto): Promise<void>;
    findAll(): Promise<void>;
    findOne(id: number): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
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
