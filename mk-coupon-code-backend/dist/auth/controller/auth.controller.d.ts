import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: any;
    }>;
    getProfile(req: any): any;
}
