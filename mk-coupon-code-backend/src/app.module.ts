import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CouponsModule } from './coupons/coupons.module';
import { CustomersModule } from './customers/customers.module';
import { RedemptionsModule } from './redemptions/redemptions.module';
import { WithdrawalsModule } from './withdrawals/withdrawals.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/service/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-nameless-wildflower-a4uspfnm-pooler.us-east-1.aws.neon.tech',
      port: 5432,
      username: 'neondb_owner',
      password: 'npg_ux14TCzsfQUg',
      database: 'neondb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      "ssl": true,
      "extra": {
        "ssl": {
          "rejectUnauthorized": false
        }
      },
      synchronize: true, // Disable in production
    }), CouponsModule, CustomersModule, RedemptionsModule, WithdrawalsModule, SharedModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private authService: AuthService) {
    this.authService.seedAdminUser().catch(err => console.error(err));
  }
}