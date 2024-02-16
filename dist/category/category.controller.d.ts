import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<void>;
    findAll(): Promise<void>;
    findOne(id: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
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
