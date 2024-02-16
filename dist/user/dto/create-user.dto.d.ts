export declare class CreateUserDto {
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
