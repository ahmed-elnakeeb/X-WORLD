import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly prisma;
    private responses;
    register(registerDto: RegisterDto): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    private updateFCMToken;
}
