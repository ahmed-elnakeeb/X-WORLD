import { CreateColorDto } from './create-color.dto';
declare const UpdateColorDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateColorDto>>;
export declare class UpdateColorDto extends UpdateColorDto_base {
    name: string;
    hexCode: string;
    created_at?: Date;
    updated_at?: Date;
}
export {};
