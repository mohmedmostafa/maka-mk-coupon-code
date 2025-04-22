import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';
import { User } from '../entity/user.entity';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    validateUser(loginDto: LoginDto): Promise<{
        access_token: string;
        user: any;
    }>;
    seedAdminUser(): Promise<void>;
}
