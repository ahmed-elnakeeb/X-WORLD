import { CreateCategoryDto } from './create-category.dto';
declare const UpdateCategoryDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCategoryDto>>;
export declare class UpdateCategoryDto extends UpdateCategoryDto_base {
    title_en: string;
    title_ar: string;
    created_at?: Date;
    updated_at?: Date;
}
export {};
