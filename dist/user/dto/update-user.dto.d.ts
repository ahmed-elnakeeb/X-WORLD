import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    uuid?: string;
    device_id: string;
    gender: Gender;
    category_id: number;
    age: number;
    role: Role;
    rockets: number;
    is_banned: boolean;
    ban_level: BAN_LEVEL;
    ban_end_in: Date;
    is_deleted: boolean;
    created_at?: Date;
    updated_at?: Date;
}
export {};
