import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from 'src/coupons/entity/coupon.entity';
import { Customer } from 'src/customers/entity/customer.entity';
import { Redemption } from 'src/redemptions/entity/redemption.entity';
import { Withdrawal } from 'src/withdrawals/entity/withdrawal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coupon, Customer, Redemption, Withdrawal]),
  ],
  exports: [TypeOrmModule],
})
export class SharedModule {}