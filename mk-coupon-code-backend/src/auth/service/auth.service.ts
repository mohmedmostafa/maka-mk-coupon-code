import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<{ access_token: string; user: any }> {
    const user = await this.usersRepository.findOne({ where: { email: loginDto.email } });
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is inactive');
    }

    const payload = { email: user.email, sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async seedAdminUser() {
    const adminExists = await this.usersRepository.findOne({ where: { email: 'admin@example.com' } });
    if (!adminExists) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      const admin = this.usersRepository.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        isActive: true,
      });
      
      await this.usersRepository.save(admin);
      console.log('Admin user created');
    }
  }
}