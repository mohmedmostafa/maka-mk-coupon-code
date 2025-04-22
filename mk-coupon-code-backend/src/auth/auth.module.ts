import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller/auth.controller';
import { User } from './entity/user.entity';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // Change this in production
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]),
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule,AuthService],
})
export class AuthModule {}