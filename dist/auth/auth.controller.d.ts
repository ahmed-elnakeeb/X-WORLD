import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(registerDto: RegisterDto): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
}
