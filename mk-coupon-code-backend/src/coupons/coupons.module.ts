import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entity/coupon.entity';
import { SharedModule } from 'src/shared/shared.module';
import { CouponController } from './controller/coupons.controller';
import { CouponService } from './service/coupon.service';
import { CustomersModule } from 'src/customers/customers.module';
import { RedemptionsModule } from 'src/redemptions/redemptions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coupon]),
    forwardRef(() => SharedModule),
    forwardRef(() => CustomersModule),
    forwardRef(() => RedemptionsModule),    
  ],
  controllers: [CouponController],
  providers: [CouponService],
  exports: [CouponService]
})
export class CouponsModule {}
