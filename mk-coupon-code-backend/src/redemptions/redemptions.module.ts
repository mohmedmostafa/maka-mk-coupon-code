import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Redemption } from './entity/redemption.entity';
import { RedemptionService } from './service/redemption.service';
import { CouponsModule } from 'src/coupons/coupons.module';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
    imports: [
      TypeOrmModule.forFeature([Redemption]),
      forwardRef(() => SharedModule),
      forwardRef(() => CouponsModule), 
      forwardRef(() => CustomersModule), 
    ],
    providers: [RedemptionService],
    exports: [RedemptionService]
  })
export class RedemptionsModule {}
